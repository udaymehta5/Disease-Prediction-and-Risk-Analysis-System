import io
import csv
from pypdf import PdfReader

def parse_txt(file_bytes: bytes) -> str:
    """Reads plain text bytes into a clean string, handling encodings safely."""
    try:
        return file_bytes.decode('utf-8')
    except UnicodeDecodeError:
        return file_bytes.decode('latin-1', errors='ignore')

def parse_pdf(file_bytes: bytes) -> str:
    """Extracts text content from a PDF document using pypdf."""
    stream = io.BytesIO(file_bytes)
    reader = PdfReader(stream)
    extracted_text = []

    for page_idx, page in enumerate(reader.pages):
        text = page.extract_text()
        if text:
            extracted_text.append(f"--- Page {page_idx + 1} ---\n{text.strip()}")

    return "\n\n".join(extracted_text)

def parse_csv(file_bytes: bytes) -> str:
    """Parses tabular CSV bytes into readable structured text representations."""
    text_content = parse_txt(file_bytes)
    stream = io.StringIO(text_content)
    reader = csv.reader(stream)

    rows = list(reader)
    if not rows:
        return ""

    header = rows[0]
    formatted_lines = [f"Columns: {', '.join(header)}"]

    for row_idx, row in enumerate(rows[1:], start=1):
        # Format each row as key: value pairs if column counts match
        if len(row) == len(header):
            row_items = [f"{header[i]}: {row[i]}" for i in range(len(header)) if row[i].strip()]
            formatted_lines.append(f"Record {row_idx}: " + "; ".join(row_items))
        else:
            formatted_lines.append(f"Record {row_idx}: " + ", ".join(row))

    return "\n".join(formatted_lines)

def parse_document(file_bytes: bytes, filename: str) -> str:
    """
    Parses an uploaded file based on its file extension (.csv, .pdf, .txt).
    Raises ValueError for unsupported file extensions.
    """
    filename_lower = filename.lower()
    if filename_lower.endswith('.csv'):
        return parse_csv(file_bytes)
    elif filename_lower.endswith('.pdf'):
        return parse_pdf(file_bytes)
    elif filename_lower.endswith('.txt'):
        return parse_txt(file_bytes)
    else:
        raise ValueError(f"Unsupported file format: {filename}. Only CSV, PDF, and TXT are supported.")
