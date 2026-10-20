const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from root .env or backend .env
dotenv.config({ path: path.resolve(__dirname, '../../../.env'), override: true });
dotenv.config({ override: true });

const { Pool } = require('pg');

const rawConnectionString = process.env.DATABASE_URL || '';
// Strip inline comments if present
const connectionString = rawConnectionString.split('#')[0].trim();

// Check if connection string is configured and not placeholder
const isPlaceholder = !connectionString || 
  connectionString.includes('[YOUR-PASSWORD]') || 
  connectionString.includes('[YOUR-PROJECT-REF]') ||
  connectionString.includes('[');

let pool = null;
let isConfigured = false;

if (!isPlaceholder) {
  try {
    const isLocal = connectionString.includes('localhost') || connectionString.includes('127.0.0.1');
    pool = new Pool({
      connectionString,
      ssl: isLocal ? false : { rejectUnauthorized: false }
    });

    pool.on('connect', () => {
      console.log('Connected to PostgreSQL database via connection pool');
    });

    pool.on('error', (err) => {
      console.error('Unexpected error on idle PostgreSQL client:', err.message);
    });

    isConfigured = true;
  } catch (err) {
    console.warn('[DB Config Warning] Failed to initialize PostgreSQL pool:', err.message);
    isConfigured = false;
  }
} else {
  console.warn('[DB Config Notice] DATABASE_URL is unconfigured or contains placeholder values. Running in offline/demo mode.');
}

const query = async (text, params) => {
  if (!isConfigured || !pool) {
    const err = new Error(
      'Database is not configured. Please update DATABASE_URL in your .env file with your real Supabase connection string.'
    );
    err.statusCode = 503;
    throw err;
  }
  return pool.query(text, params);
};

module.exports = {
  query,
  pool,
  isConfigured
};
