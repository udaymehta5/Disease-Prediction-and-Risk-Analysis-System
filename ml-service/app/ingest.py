import sys
from pathlib import Path

# Add ml-service root to python path so app.* modules resolve cleanly
current_dir = Path(__file__).resolve().parent
service_root = current_dir.parent
if str(service_root) not in sys.path:
    sys.path.insert(0, str(service_root))

from app.rag import chunk_text, store_document_chunks, get_db_connection

def ingest_seed_data():
    """
    Reads all seed files from database/seed, chunks them, computes embeddings,
    and inserts them into the Supabase pgvector documents table.
    """
    workspace_root = current_dir.parent.parent
    seed_dir = workspace_root / "database" / "seed"

    if not seed_dir.exists():
        print(f"[Ingest Error] Seed directory not found at: {seed_dir}")
        return

    seed_files = list(seed_dir.glob("*.txt")) + list(seed_dir.glob("*.csv"))

    if not seed_files:
        print(f"[Ingest Warning] No .txt or .csv files found in {seed_dir}")
        return

    print(f"=== Starting Disease Knowledge Ingestion ({len(seed_files)} seed files) ===")

    # Test database connectivity first
    try:
        conn = get_db_connection()
        with conn.cursor() as cur:
            cur.execute("SELECT 1;")
        conn.close()
        print("Connected successfully to PostgreSQL (pgvector).")
    except Exception as e:
        print(f"[Ingest Aborted] Database connection failed: {e}")
        print("Please ensure your DATABASE_URL in .env is correct and schema.sql has been executed in Supabase.")
        return

    total_chunks = 0

    for file_path in seed_files:
        print(f"Processing: {file_path.name}...")
        try:
            content = file_path.read_text(encoding="utf-8", errors="ignore")
            chunks = chunk_text(content, chunk_size=500, overlap=50)

            metadata = {
                "source": "seed",
                "filename": file_path.name
            }

            inserted = store_document_chunks(chunks, user_id=None, metadata=metadata)
            total_chunks += inserted
            print(f"  -> Generated {len(chunks)} chunks and stored {inserted} vectors.")
        except Exception as e:
            print(f"  [Error] Failed ingesting {file_path.name}: {e}")

    print(f"\nIngestion Complete! Total vectors stored in pgvector: {total_chunks}")

if __name__ == "__main__":
    ingest_seed_data()
