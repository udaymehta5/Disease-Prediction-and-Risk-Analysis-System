const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from root .env or backend .env
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config();

const { Pool } = require('pg');

// Initialize PostgreSQL connection pool using Supabase DATABASE_URL
const connectionString = process.env.DATABASE_URL;

// Supabase cloud PostgreSQL requires SSL
const isLocal = connectionString && (connectionString.includes('localhost') || connectionString.includes('127.0.0.1'));

const pool = new Pool({
  connectionString,
  ssl: isLocal ? false : { rejectUnauthorized: false }
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database via connection pool');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client:', err.message);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
