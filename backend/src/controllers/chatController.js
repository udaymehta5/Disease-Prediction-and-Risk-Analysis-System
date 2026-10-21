const axios = require('axios');
const db = require('../config/db');
const mlService = require('../services/mlService');

const ML_SERVICE_URL = (process.env.ML_SERVICE_URL || '').trim();
const hasExternalMlService = ML_SERVICE_URL && 
  !ML_SERVICE_URL.includes('localhost') && 
  !ML_SERVICE_URL.includes('127.0.0.1') && 
  ML_SERVICE_URL !== 'internal';

const sendChatMessage = async (req, res, next) => {
  try {
    const { message, history } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message text cannot be empty.' });
    }

    // 1. Try external ML service if configured
    if (hasExternalMlService) {
      try {
        const response = await axios.post(`${ML_SERVICE_URL}/chat`, {
          message: message.trim(),
          history: history || [],
          user_id: req.user?.id || null
        }, {
          timeout: 45000
        });
        return res.status(200).json(response.data);
      } catch (externalErr) {
        console.warn(`[Chat Notice] External ML service failed (${externalErr.message}). Using built-in native engine.`);
      }
    }

    // 2. Built-in native Groq chat engine
    const chatResult = await mlService.chat(message, history || [], req.user?.id || null);
    return res.status(200).json(chatResult);

  } catch (err) {
    next(err);
  }
};

const analyzeChat = async (req, res, next) => {
  try {
    const { history } = req.body;

    if (!history || !Array.isArray(history) || history.length === 0) {
      return res.status(400).json({ error: 'Conversation history is required for risk analysis.' });
    }

    let predictionData = null;

    // 1. Try external ML service if configured
    if (hasExternalMlService) {
      try {
        const response = await axios.post(`${ML_SERVICE_URL}/chat/analyze`, {
          history,
          user_id: req.user?.id || null
        }, {
          timeout: 45000
        });
        predictionData = response.data;
      } catch (externalErr) {
        console.warn(`[Chat Analysis Notice] External ML service failed (${externalErr.message}). Using built-in native engine.`);
      }
    }

    // 2. Built-in native Groq risk synthesis
    if (!predictionData) {
      predictionData = await mlService.analyzeChat(history, req.user?.id || null);
    }

    const userMsgs = history.filter(m => m.role === 'user').map(m => m.content);
    const inputSummary = userMsgs.length > 0
      ? `Consultation Summary: ${userMsgs.join('; ').slice(0, 150)}...`
      : 'AI Symptom Consultation Transcript';

    // 3. Save to Supabase results history
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
    next(err);
  }
};

module.exports = {
  sendChatMessage,
  analyzeChat
};

