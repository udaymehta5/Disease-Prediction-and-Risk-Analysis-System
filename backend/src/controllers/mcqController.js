const axios = require('axios');
const db = require('../config/db');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

// POST /api/mcq/next
const getNextQuestion = async (req, res, next) => {
  try {
    const { step, answers } = req.body;

    const response = await axios.post(`${ML_SERVICE_URL}/mcq/next`, {
      step: typeof step === 'number' ? step : 1,
      answers: answers || [],
      user_id: req.user?.id || null
    }, {
      timeout: 30000
    });

    return res.status(200).json(response.data);
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json({
        error: err.response.data?.detail || err.response.data?.error || 'Failed to fetch next question.'
      });
    }
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

    // Call FastAPI to synthesize answers into standard prediction JSON
    const response = await axios.post(`${ML_SERVICE_URL}/mcq/result`, {
      answers,
      user_id: req.user?.id || null
    }, {
      timeout: 60000
    });

    const predictionData = response.data;
    const inputSummary = `MCQ Symptom Assessment (${answers.length} questions completed)`;

    // Save prediction result to database
    let savedResultId = null;
    try {
      const insertResult = await db.query(
        `INSERT INTO results (user_id, source, input_summary, result_json) 
         VALUES ($1, 'mcq', $2, $3) 
         RETURNING id`,
        [req.user.id, inputSummary, JSON.stringify(predictionData)]
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
    if (err.response) {
      return res.status(err.response.status).json({
        error: err.response.data?.detail || err.response.data?.error || 'Failed to analyze quiz answers.'
      });
    }
    next(err);
  }
};

module.exports = {
  getNextQuestion,
  submitResult
};
