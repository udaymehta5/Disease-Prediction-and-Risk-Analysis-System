const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from root or backend directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const chatRoutes = require('./routes/chatRoutes');
const mcqRoutes = require('./routes/mcqRoutes');
const historyRoutes = require('./routes/historyRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// 1. CORS Configuration (Supports localhost, 127.0.0.1, Vercel, and custom domains)
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

if (CLIENT_URL && CLIENT_URL !== '*') {
  CLIENT_URL.split(',').forEach(url => {
    const trimmed = url.trim();
    if (trimmed && !allowedOrigins.includes(trimmed)) {
      allowedOrigins.push(trimmed);
    }
  });
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (Postman, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (CLIENT_URL === '*' || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // Allow local development on any port
    if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }
    return callback(null, true); // Fallback allow in dev
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

// 2. Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'disease-prediction-backend' });
});

// 4. Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/mcq', mcqRoutes);
app.use('/api/history', historyRoutes);

// 5. 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.originalUrl}` });
});

// 6. Centralized Error Handler (must be last middleware)
app.use(errorHandler);

// 7. Start listening
app.listen(PORT, () => {
  const mlTarget = process.env.ML_SERVICE_URL && !process.env.ML_SERVICE_URL.includes('localhost')
    ? `External proxy (${process.env.ML_SERVICE_URL})`
    : 'Built-in Native Groq ML Engine (Single-Folder Deployment Ready)';

  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`CORS enabled for origin: ${CLIENT_URL}`);
  console.log(`ML Engine Status: ${mlTarget}`);
});

module.exports = app;


