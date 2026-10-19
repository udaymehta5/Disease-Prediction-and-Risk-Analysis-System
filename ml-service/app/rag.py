import os
import json
from pathlib import Path
from dotenv import load_dotenv
import psycopg2

# Load environment variables
dotenv_path = Path(__file__).resolve().parent.parent.parent / '.env'
if dotenv_path.exists():
    load_dotenv(dotenv_path=dotenv_path)
else:
    load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "")
EMBEDDING_MODEL_NAME = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")

_embedder = None

def get_embedder():
    """Loads and caches the SentenceTransformer model (384 dimensions) on demand."""
    global _embedder
    if _embedder is None:
        print(f"[RAG] Loading embedding model: {EMBEDDING_MODEL_NAME}...")
        from sentence_transformers import SentenceTransformer
        _embedder = SentenceTransformer(EMBEDDING_MODEL_NAME)
    return _embedder

def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> list[str]:
    """
    Splits text into overlapping chunks of ~500 characters with 50 characters overlap.
    Preserves context between consecutive chunks.
    """
    clean_text = text.strip()
    if not clean_text:
        return []

    chunks = []
    start = 0
    text_len = len(clean_text)

    while start < text_len:
        end = min(start + chunk_size, text_len)
        chunk = clean_text[start:end].strip()
        if chunk:
            chunks.append(chunk)
        if end >= text_len:
            break
        start += (chunk_size - overlap)

    return chunks

def embed_text(text: str) -> list[float]:
    """Generates a 384-dimensional vector embedding for the input text."""
    embedder = get_embedder()
    embedding = embedder.encode(text, normalize_embeddings=True)
    return embedding.tolist()

def get_db_connection():
    """Establishes a connection to the Supabase PostgreSQL database."""
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL environment variable is not configured.")
    
    # Supabase cloud requires SSL mode
    sslmode = "disable" if "localhost" in DATABASE_URL or "127.0.0.1" in DATABASE_URL else "require"
    return psycopg2.connect(DATABASE_URL, sslmode=sslmode)

def store_document_chunks(chunks: list[str], user_id: int | None = None, metadata: dict | None = None) -> int:
    """
    Embeds each chunk and inserts it into the pgvector documents table.
    Returns the count of inserted chunks.
    """
    if not chunks:
        return 0

    conn = get_db_connection()
    inserted_count = 0

    try:
        with conn.cursor() as cur:
            for chunk in chunks:
                vector = embed_text(chunk)
                vector_str = f"[{','.join(str(x) for x in vector)}]"
                meta_json = json.dumps(metadata or {})

                cur.execute(
                    """
                    INSERT INTO documents (user_id, content, embedding, metadata)
                    VALUES (%s, %s, %s::vector, %s)
                    """,
                    (user_id, chunk, vector_str, meta_json)
                )
                inserted_count += 1
        conn.commit()
    finally:
        conn.close()

    return inserted_count

def retrieve_relevant_chunks(query: str, user_id: int | None = None, top_k: int = 4) -> list[str]:
    """
    Embeds query and queries pgvector documents table for the top 4 most similar chunks
    by cosine similarity (<=> operator in pgvector).
    Includes seed documents (user_id is NULL) plus the user's own documents.
    """
    if not query.strip():
        return []

    conn = get_db_connection()
    chunks = []

    try:
        query_vector = embed_text(query)
        vector_str = f"[{','.join(str(x) for x in query_vector)}]"

        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT content, (1 - (embedding <=> %s::vector)) AS similarity
                FROM documents
                WHERE user_id IS NULL OR user_id = %s
                ORDER BY embedding <=> %s::vector
                LIMIT %s;
                """,
                (vector_str, user_id, vector_str, top_k)
            )
            rows = cur.fetchall()
            chunks = [r[0] for r in rows]
    finally:
        conn.close()

    return chunks
