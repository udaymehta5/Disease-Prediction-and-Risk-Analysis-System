-- ====================================================================
-- Disease Prediction and Risk Analysis - Database Schema
-- Run this in your Supabase Project: SQL Editor -> New Query -> Run
-- ====================================================================

-- 1. Enable pgvector extension for storing and querying AI vector embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Users Table
-- Stores user account information with securely hashed passwords
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index on email for fast authentication lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 3. Results Table
-- Stores historical predictions generated via File Upload, AI Chat, or MCQ Quiz
CREATE TABLE IF NOT EXISTS results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    source VARCHAR(50) NOT NULL CHECK (source IN ('upload', 'chat', 'mcq')),
    input_summary TEXT NOT NULL,
    result_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index on user_id for fast history retrieval per user
CREATE INDEX IF NOT EXISTS idx_results_user_id ON results(user_id);
CREATE INDEX IF NOT EXISTS idx_results_created_at ON results(created_at DESC);

-- 4. Documents Table (Vector Store for RAG)
-- Stores chunked disease knowledge documents and embeddings (384 dimensions for all-MiniLM-L6-v2)
-- user_id is NULL for general seed knowledge, or set to a user's id for private uploaded documents
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    embedding vector(384) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index on user_id for filtering seed vs user-specific documents
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);

-- HNSW Vector Index for fast cosine similarity search (<=> operator)
-- HNSW builds correctly on empty tables and scales smoothly
CREATE INDEX IF NOT EXISTS idx_documents_embedding_hnsw 
ON documents 
USING hnsw (embedding vector_cosine_ops);
