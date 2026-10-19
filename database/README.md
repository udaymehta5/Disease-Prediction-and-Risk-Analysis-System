# Database Setup Guide (Supabase PostgreSQL)

This project uses PostgreSQL hosted on **Supabase** with the `pgvector` extension enabled for Retrieval-Augmented Generation (RAG).

---

## How to Set Up the Database in Supabase

### Step 1: Create a Free Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and log in.
2. Click **New project**.
3. Choose a name (e.g., `disease-prediction-db`) and enter a strong database password. Keep this password safe!
4. Select your preferred region and click **Create new project**.

---

### Step 2: Run `schema.sql` in the SQL Editor
1. In your Supabase project dashboard, navigate to the **SQL Editor** tab from the left sidebar (icon with `>_`).
2. Click **+ New query**.
3. Open [`database/schema.sql`](file:///c:/Users/udaym/OneDrive/Desktop/Disease%20Prediction%20Model/database/schema.sql) from this project, copy the entire file content, and paste it into the SQL Editor.
4. Click the green **Run** button (or press `Ctrl + Enter`).
5. You should see `Success. No rows returned`.

This will:
- Enable the `vector` extension.
- Create the `users` table for authentication.
- Create the `results` table for user prediction history.
- Create the `documents` table with a 384-dimensional vector column and an HNSW vector index for RAG.

---

### Step 3: Get Your Connection String
1. In Supabase, go to **Project Settings** (gear icon in the left sidebar) -> **Database**.
2. Scroll down to **Connection parameters** or **Connection string**.
3. Select the **URI** tab.
4. Copy the connection string format:
   ```text
   postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with the database password you chose in Step 1.
6. Paste this URI into your `.env` file under `DATABASE_URL`:
   ```env
   DATABASE_URL=postgresql://postgres:yourpassword@db.xyz.supabase.co:5432/postgres
   ```
