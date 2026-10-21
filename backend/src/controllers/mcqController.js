const axios = require('axios');
const db = require('../config/db');
const mlService = require('../services/mlService');

const ML_SERVICE_URL = (process.env.ML_SERVICE_URL || '').trim();
const hasExternalMlService = ML_SERVICE_URL && 
  !ML_SERVICE_URL.includes('localhost') && 
  !ML_SERVICE_URL.includes('127.0.0.1') && 
  ML_SERVICE_URL !== 'internal';

// POST /api/mcq/next
const getNextQuestion = async (req, res, next) => {
  try {
    const { step, answers } = req.body;

    // 1. Try external ML service if configured
    if (hasExternalMlService) {
      try {
        const response = await axios.post(`${ML_SERVICE_URL}/mcq/next`, {
          step: typeof step === 'number' ? step : 1,
          answers: answers || [],
          user_id: req.user?.id || null
        }, {
          timeout: 30000
        });
        return res.status(200).json(response.data);
      } catch (externalErr) {
        console.warn(`[MCQ Notice] External ML service failed (${externalErr.message}). Using built-in native engine.`);
      }
    }

    // 2. Built-in native Groq MCQ engine
    const mcqData = await mlService.getNextMcq(step, answers || [], req.user?.id || null);
    return res.status(200).json(mcqData);

  } catch (err) {
    next(err);
  }
};

// POST /api/mcq/result
const submitResult = async (req, res, next) => {
  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: 'Assessment answers are required to generate prediction.' });
    }

    let predictionData = null;

    // 1. Try external ML service if configured
    if (hasExternalMlService) {
      try {
        const response = await axios.post(`${ML_SERVICE_URL}/mcq/result`, {
          answers,
          user_id: req.user?.id || null
        }, {
          timeout: 45000
        });
        predictionData = response.data;
      } catch (externalErr) {
        console.warn(`[MCQ Result Notice] External ML service failed (${externalErr.message}). Using built-in native engine.`);
      }
    }

    // 2. Built-in native Groq MCQ evaluation
    if (!predictionData) {
      predictionData = await mlService.analyzeMcqResult(answers, req.user?.id || null);
    }

    const inputSummary = `MCQ Symptom Assessment (${answers.length} questions completed)`;

    // 3. Save prediction result to database
    let savedResultId = null;
    try {
      const insertResult = await db.query(
        `INSERT INTO results (user_id, source, input_summary, result_json) 
         VALUES ($1, 'mcq', $2, $3) 
         RETURNING id`,
        [req.user?.id || 1, inputSummary, JSON.stringify(predictionData)]
      );
      savedResultId = insertResult.rows[0]?.id;
    } catch (dbErr) {
      console.error('[MCQ DB Error] Could not save result to database:', dbErr.message);
    }

    return res.status(200).json({
      id: savedResultId,
      source: 'mcq',
      inputSummary,
      result: predictionData
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getNextQuestion,
  submitResult
};

