const axios = require('axios');
const db = require('../config/db');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

const sendChatMessage = async (req, res, next) => {
  try {
    const { message, history } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message text cannot be empty.' });
    }

    // Forward message to FastAPI /chat endpoint
    const response = await axios.post(`${ML_SERVICE_URL}/chat`, {
      message: message.trim(),
      history: history || [],
      user_id: req.user?.id || null
    }, {
      timeout: 45000 // 45s timeout for Groq LLM
    });

    return res.status(200).json(response.data);
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json({
        error: err.response.data?.detail || err.response.data?.error || 'Chat service error.'
      });
    }
    next(err);
  }
};

const analyzeChat = async (req, res, next) => {
  try {
    const { history } = req.body;

    if (!history || !Array.isArray(history) || history.length === 0) {
      return res.status(400).json({ error: 'Conversation history is required for risk analysis.' });
    }

    // Forward to FastAPI /chat/analyze endpoint
    const response = await axios.post(`${ML_SERVICE_URL}/chat/analyze`, {
      history,
      user_id: req.user?.id || null
    }, {
      timeout: 45000
    });

    const predictionData = response.data;
    const userMsgs = history.filter(m => m.role === 'user').map(m => m.content);
    const inputSummary = userMsgs.length > 0
      ? `Consultation Summary: ${userMsgs.join('; ').slice(0, 150)}...`
      : 'AI Symptom Consultation Transcript';

    // Save to Supabase results history
    let savedResultId = null;
    if (db.isConfigured && req.user && req.user.id !== 9999) {
      try {
        const insertResult = await db.query(
          `INSERT INTO results (user_id, source, input_summary, result_json)
           VALUES ($1, 'chat', $2, $3)
           RETURNING id`,
          [req.user.id, inputSummary, JSON.stringify(predictionData)]
        );
        savedResultId = insertResult.rows[0]?.id;
      } catch (dbErr) {
        console.error('[Chat DB Save Notice]', dbErr.message);
      }
    }

    return res.status(200).json({
      id: savedResultId,
      source: 'chat',
      inputSummary,
      result: predictionData
    });
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json({
        error: err.response.data?.detail || err.response.data?.error || 'Failed to synthesize risk assessment.'
      });
    }
    next(err);
  }
};

module.exports = {
  sendChatMessage,
  analyzeChat
};
