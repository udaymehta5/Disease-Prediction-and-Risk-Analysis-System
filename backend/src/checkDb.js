require('dotenv').config({ path: '../.env' });
const db = require('./config/db');

async function checkDatabase() {
  console.log('\n======================================================');
  console.log('       🏥 VITA SIGNAL DATABASE INSPECTION TOOL        ');
  console.log('======================================================\n');

  try {
    // 1. Registered Users
    console.log('📌 1. REGISTERED USERS (users table):');
    const users = await db.query(
      'SELECT id, name, email, to_char(created_at, \'YYYY-MM-DD HH24:MI:SS\') as registered_at FROM users ORDER BY id ASC'
    );
    if (users.rows.length === 0) {
      console.log('No registered users found yet.');
    } else {
      console.table(users.rows);
    }

    // 2. Health Records & Predictions
    console.log('\n📌 2. HEALTH ASSESSMENTS & PREDICTIONS (results table):');
    const results = await db.query(`
      SELECT 
        r.id,
        u.name as patient_name,
        u.email as patient_email,
        r.source,
        r.input_summary,
        r.result_json->'risk'->>'level' as risk_level,
        r.result_json->'predictions'->0->>'disease' as primary_prediction,
        to_char(r.created_at, 'YYYY-MM-DD HH24:MI:SS') as assessment_date
      FROM results r
      LEFT JOIN users u ON r.user_id = u.id
      ORDER BY r.created_at DESC
      LIMIT 15
    `);

    if (results.rows.length === 0) {
      console.log('No health assessment records submitted yet.');
    } else {
      console.table(results.rows);
    }

    // 3. Knowledge / Document Store
    console.log('\n📌 3. DOCUMENT / RAG KNOWLEDGE STORE (documents table):');
    const docs = await db.query(`
      SELECT 
        count(*) as total_documents,
        count(CASE WHEN user_id IS NULL THEN 1 END) as seed_reference_docs,
        count(CASE WHEN user_id IS NOT NULL THEN 1 END) as user_uploaded_docs
      FROM documents
    `);
    console.table(docs.rows);

    console.log('======================================================\n');
  } catch (err) {
    console.error('Database query error:', err.message);
  } finally {
    process.exit(0);
  }
}

checkDatabase();
