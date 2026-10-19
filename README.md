# Disease Prediction and Risk Analysis

A clean, beginner-friendly college major project providing preliminary disease predictions and risk assessments through three distinct interaction modes:
1. **File Upload** (Medical reports in CSV, PDF, or TXT format)
2. **AI Chat** (Interactive natural language symptom consultation)
3. **Symptom Quiz (MCQ)** (Dynamic 8-10 question adaptive assessment)

> **Medical Disclaimer:** This application is strictly an educational and informational tool. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider with any medical questions.

---

## 1. System Architecture

```text
+--------------------------------------------------------------------+
|                         React Frontend                             |
|          (Vite + Redux Toolkit + React Router + Axios)             |
|                      http://localhost:5173                         |
+---------------------------------+----------------------------------+
                                  |
                           REST API (Axios)
                                  |
                                  v
+--------------------------------------------------------------------+
|                      Node.js / Express Backend                     |
|            - Auth (JWT, bcrypt)                                    |
|            - File handling (Multer, 5MB limit, CSV/PDF/TXT)        |
|            - PostgreSQL connection pool (pg)                       |
|            - Request forwarding to Python ML service               |
|                      http://localhost:5000                         |
+-------------------+-----------------------------+------------------+
                    |                             |
             SQL / pg Pool                Internal REST API
                    |                             |
                    v                             v
+-----------------------+     +--------------------------------------+
|  Supabase PostgreSQL  |     |        Python FastAPI ML Service     |
|  - Users (auth)       |     |  - Sentence-Transformers Embeddings  |
|  - Results History    |     |  - RAG Retriever (via pgvector)      |
|  - Documents (Vector) |<----+  - Groq LLM (llama-3.3-70b-versatile)|
+-----------------------+     |        http://localhost:8000         |
                              +--------------------------------------+
```

---

## 2. Project Directory Structure

```text
disease-prediction-and-risk-analysis/
├── frontend/                     # React + Vite client
│   └── src/
│       ├── pages/                # Dashboard, Login, Register, Upload, Chat, MCQ, Result, History
│       ├── components/           # Navbar, FileDropzone, ChatBox, MCQCard, RiskCard, ProtectedRoute
│       ├── store/                # Redux Toolkit (authSlice, chatSlice, resultSlice)
│       ├── services/             # Axios instance with JWT interceptor (api.js)
│       └── App.jsx, main.jsx
├── backend/                      # Node.js + Express API server
│   ├── src/
│   │   ├── routes/               # auth, upload, chat, mcq, history
│   │   ├── controllers/          # Business logic handlers
│   │   ├── middleware/           # authMiddleware, upload with Multer, errorHandler
│   │   ├── config/               # db.js (PostgreSQL pool)
│   │   └── server.js             # Main server entrypoint
│   └── uploads/                  # Temporary file storage (gitignored)
├── database/                     # Database schemas and seed data
│   ├── schema.sql                # Table definitions + pgvector extension + indexes
│   ├── seed/                     # 7 Clinical knowledge files (.txt) for RAG
│   ├── sample_lab_report.csv     # Sample report for upload testing
│   └── README.md                 # Supabase setup instructions
├── ml-service/                   # Python FastAPI ML & RAG service
│   ├── app/
│   │   ├── main.py               # FastAPI application and route endpoints
│   │   ├── rag.py                # Embedding generator and pgvector similarity search
│   │   ├── llm.py                # Groq API client wrapper with safe JSON fallback
│   │   ├── predict.py            # Prediction & risk analysis logic
│   │   ├── parsers.py            # CSV / PDF / TXT document parsers
│   │   └── ingest.py             # Seed ingestion CLI script
│   └── requirements.txt
├── .env.example                  # Environment configuration template
├── .gitignore                    # Version control ignore rules
└── README.md                     # Project documentation
```

---

## 3. Environment Variables Guide

Create a `.env` file in the workspace root by copying `.env.example`:

```bash
cp .env.example .env
```

| Variable | Description | Example / Where to obtain |
| :--- | :--- | :--- |
| `PORT` | Port for the Node.js backend | `5000` |
| `DATABASE_URL` | Supabase PostgreSQL URI with password | `postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres` |
| `JWT_SECRET` | Secret key for signing auth tokens | Any secure random string (min 32 chars) |
| `ML_SERVICE_URL` | Base URL of the Python FastAPI service | `http://localhost:8000` |
| `CLIENT_URL` | Allowed frontend origin for CORS | `http://localhost:5173` |
| `GROQ_API_KEY` | Free LLM API key | Obtain from [console.groq.com](https://console.groq.com) |
| `GROQ_MODEL` | Fast Llama model name | `llama-3.3-70b-versatile` |
| `EMBEDDING_MODEL` | Sentence Transformers local model | `all-MiniLM-L6-v2` |
| `VITE_API_URL` | Backend URL consumed by frontend | `http://localhost:5000/api` |

---

## 4. Step-by-Step Setup and Installation

### Step 1: Database Setup in Supabase
1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** tab.
3. Paste the contents of [`database/schema.sql`](file:///c:/Users/udaym/OneDrive/Desktop/Disease%20Prediction%20Model/database/schema.sql) and run it. This creates:
   - `pgvector` extension
   - `users` table
   - `results` table
   - `documents` table with HNSW vector index (384 dimensions)
4. Copy the database connection URI from **Project Settings > Database > Connection String (URI)** and set it as `DATABASE_URL` in `.env`.

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Install ML Service Dependencies & Ingest Knowledge Base
```bash
cd ml-service
pip install -r requirements.txt

# Ingest all clinical seed knowledge files into pgvector:
python -m app.ingest
```

### Step 4: Install Frontend Dependencies
```bash
cd frontend
npm install
```

---

## 5. Running the Application

Open 3 separate terminals:

### Terminal 1: Node.js Backend Server
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

### Terminal 2: Python FastAPI ML Service
```bash
cd ml-service
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
# ML Service runs on http://localhost:8000
```

### Terminal 3: React Frontend Client
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 6. End-to-End Testing Guide

### 1. Test Backend Auth
```powershell
# Register a test account:
curl.exe -s -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"name":"Alex Student","email":"alex@example.com","password":"password123"}'

# Login:
curl.exe -s -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"alex@example.com","password":"password123"}'
```

### 2. Test File Upload Flow
Use the sample report provided at [`database/sample_lab_report.csv`](file:///c:/Users/udaym/OneDrive/Desktop/Disease%20Prediction%20Model/database/sample_lab_report.csv):
1. In the browser, navigate to `http://localhost:5173/upload`.
2. Drag and drop `database/sample_lab_report.csv`.
3. Click **Analyze Report & Predict Risk**.
4. The system parses the biomarkers (Fasting Glucose: 148, HbA1c: 7.2%, BP: 138/86), executes RAG vector retrieval, and displays the top 3 predictions (e.g. Type 2 Diabetes, Metabolic Syndrome), risk factors, precautions, and medical disclaimer.

### 3. Test AI Chat Flow
1. Navigate to `http://localhost:5173/chat`.
2. Type: `"I have been feeling excessive thirst, drinking water all day, and waking up 4 times a night to urinate."`
3. The AI assistant responds conversationally with clinical follow-up questions, likely conditions, and risk warnings.

### 4. Test Symptom Quiz (MCQ) Flow
1. Navigate to `http://localhost:5173/mcq`.
2. Answer each of the 8 adaptive questions.
3. Upon submitting the 8th answer, the system automatically synthesizes the results and presents the standard prediction report.

### 5. Test History Flow
1. Navigate to `http://localhost:5173/history`.
2. All completed assessments (Upload, Chat, MCQ) appear with timestamps and risk levels.
3. Click **View Report** on any item to view its full details.

---

## 7. Standard Prediction Response Schema

Every assessment mode outputs the following standardized JSON schema:

```json
{
  "predictions": [
    {
      "disease": "Type 2 Diabetes Mellitus",
      "confidence": "High",
      "reason": "Elevated fasting blood glucose (148 mg/dL) and HbA1c (7.2%) with polydipsia symptoms."
    },
    {
      "disease": "Metabolic Syndrome",
      "confidence": "Medium",
      "reason": "Combined dyslipidemia, elevated blood pressure, and glycemic abnormality."
    },
    {
      "disease": "Essential Hypertension",
      "confidence": "Low",
      "reason": "Elevated systolic and diastolic measurements exceeding normotensive thresholds."
    }
  ],
  "risk": {
    "level": "High",
    "factors": [
      "Fasting blood glucose > 126 mg/dL",
      "Elevated HbA1c indicative of chronic hyperglycemia",
      "Borderline elevated systolic blood pressure"
    ],
    "precautions": [
      "Schedule comprehensive metabolic panel and follow-up HbA1c test",
      "Consult an endocrinologist or primary care physician immediately",
      "Adopt a low glycemic index diet and initiate routine blood glucose self-monitoring"
    ]
  },
  "disclaimer": "This is an informational tool, NOT a medical diagnosis. Consult a qualified doctor."
}
```

---

## 8. License & Academic Disclaimer
Built for educational purposes as a college major project.
