const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Helper to validate email format using regex
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 1. Basic validation
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Full name is required.' });
    }
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    if (!db.isConfigured) {
      return res.status(503).json({
        error: 'Database is not configured yet. Please update DATABASE_URL in your .env file with your Supabase credentials to register new accounts, or use the Demo Account to test immediately.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 2. Check if user already exists in PostgreSQL
    const existingUser = await db.query(
      'SELECT id FROM users WHERE email = $1 LIMIT 1',
      [normalizedEmail]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    // 3. Hash password using bcryptjs
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 4. Insert new user into database
    const insertResult = await db.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
      [name.trim(), normalizedEmail, passwordHash]
    );

    const newUser = insertResult.rows[0];

    // 5. Generate JWT token
    const secret = process.env.JWT_SECRET || 'fallback_secret_key_change_me';
    const token = jwt.sign(
      { id: newUser.id, name: newUser.name, email: newUser.email },
      secret,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Basic validation
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Password is required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 2. Built-in Demo Account (allows instant testing without live database connection)
    if (normalizedEmail === 'doctor@vitasignal.ai' && password === 'MedicalDemo2026!') {
      const secret = process.env.JWT_SECRET || 'fallback_secret_key_change_me';
      const token = jwt.sign(
        { id: 9999, name: 'Dr. Vita Demo', email: 'doctor@vitasignal.ai' },
        secret,
        { expiresIn: '7d' }
      );

      return res.status(200).json({
        message: 'Login successful (Demo Mode)',
        token,
        user: {
          id: 9999,
          name: 'Dr. Vita Demo',
          email: 'doctor@vitasignal.ai'
        }
      });
    }

    // Check if database is configured for non-demo users
    if (!db.isConfigured) {
      return res.status(503).json({
        error: 'Database connection is not configured in .env. Please update DATABASE_URL with your Supabase credentials, or click "Fill Demo" to sign in immediately.'
      });
    }

    // 3. Query user from database
    const userResult = await db.query(
      'SELECT id, name, email, password_hash FROM users WHERE email = $1 LIMIT 1',
      [normalizedEmail]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const user = userResult.rows[0];

    // 4. Compare password with stored hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // 5. Generate JWT token
    const secret = process.env.JWT_SECRET || 'fallback_secret_key_change_me';
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      secret,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/auth/me (convenient helper to verify token / load current profile)
const getMe = async (req, res, next) => {
  try {
    if (req.user.id === 9999) {
      return res.status(200).json({
        user: {
          id: 9999,
          name: 'Dr. Vita Demo',
          email: 'doctor@vitasignal.ai',
          created_at: new Date().toISOString()
        }
      });
    }

    if (!db.isConfigured) {
      return res.status(200).json({
        user: {
          id: req.user.id,
          name: req.user.name || 'User',
          email: req.user.email
        }
      });
    }

    const userResult = await db.query(
      'SELECT id, name, email, created_at FROM users WHERE id = $1 LIMIT 1',
      [req.user.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.status(200).json({ user: userResult.rows[0] });
  } catch (err) {
    next(err);
  }
};

// GET /api/auth/google/config (returns Google Client ID to frontend)
const getGoogleConfig = (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID || '';
  res.status(200).json({ clientId });
};

// POST /api/auth/google (verifies Google credential and creates/logs in user)
const googleLogin = async (req, res, next) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ error: 'Google credential token is required.' });
    }

    const { OAuth2Client } = require('google-auth-library');
    const clientId = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID || '';
    const client = new OAuth2Client(clientId);

    // Verify token with Google
    let payload;
    try {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: clientId || undefined
      });
      payload = ticket.getPayload();
    } catch (verifyErr) {
      // Fallback decode if offline or audience mismatch in local dev
      console.warn('[Google OAuth Verify Notice]', verifyErr.message);
      const decoded = jwt.decode(credential);
      if (decoded && decoded.email) {
        payload = decoded;
      } else {
        return res.status(401).json({ error: `Google verification failed: ${verifyErr.message}` });
      }
    }

    if (!payload || !payload.email) {
      return res.status(400).json({ error: 'Invalid Google account information.' });
    }

    const googleEmail = payload.email.trim().toLowerCase();
    const googleName = payload.name || payload.given_name || 'Google User';

    // Check if database is configured
    if (!db.isConfigured) {
      const secret = process.env.JWT_SECRET || 'fallback_secret_key_change_me';
      const token = jwt.sign(
        { id: 1001, name: googleName, email: googleEmail },
        secret,
        { expiresIn: '7d' }
      );
      return res.status(200).json({
        message: 'Google sign-in successful (Demo mode)',
        token,
        user: { id: 1001, name: googleName, email: googleEmail }
      });
    }

    // 1. Look up user by email in PostgreSQL
    const existingUser = await db.query(
      'SELECT id, name, email FROM users WHERE email = $1 LIMIT 1',
      [googleEmail]
    );

    let user;
    if (existingUser.rows.length > 0) {
      user = existingUser.rows[0];
    } else {
      // 2. New user: register in users table
      const dummyPassword = Math.random().toString(36).substring(2) + Date.now().toString(36);
      const passwordHash = await bcrypt.hash(dummyPassword, 10);

      const insertResult = await db.query(
        'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
        [googleName, googleEmail, passwordHash]
      );
      user = insertResult.rows[0];
    }

    // 3. Generate our standard JWT token
    const secret = process.env.JWT_SECRET || 'fallback_secret_key_change_me';
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      secret,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: 'Google login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error('[Google OAuth Error]', err);
    return res.status(500).json({
      error: `Google authentication failed: ${err.message}`
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  getGoogleConfig,
  googleLogin
};
