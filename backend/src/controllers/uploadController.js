const fs = require('fs');
const axios = require('axios');
const db = require('../config/db');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

const uploadReport = async (req, res, next) => {
  const filePath = req.file?.path;

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file was provided.' });
    }

    // 1. Prepare multipart form data for FastAPI /analyze-file
    const fileBuffer = fs.readFileSync(filePath);
    const blob = new Blob([fileBuffer], { type: req.file.mimetype });

    const formData = new FormData();
    formData.append('file', blob, req.file.originalname);
    if (req.user && req.user.id) {
      formData.append('user_id', String(req.user.id));
    }

    // 2. Forward to Python FastAPI ML Service
    const mlResponse = await axios.post(`${ML_SERVICE_URL}/analyze-file`, formData, {
      headers: {
        // Let Axios/FormData compute boundary headers automatically
      },
      timeout: 60000 // 60s timeout for ML model processing
    });

    const predictionData = mlResponse.data;
    const inputSummary = `File: ${req.file.originalname} (${(req.file.size / 1024).toFixed(1)} KB)`;

    // 3. Save prediction to Supabase results history table
    let savedResultId = null;
    try {
      const insertResult = await db.query(
        `INSERT INTO results (user_id, source, input_summary, result_json) 
         VALUES ($1, 'upload', $2, $3) 
         RETURNING id`,
        [req.user.id, inputSummary, JSON.stringify(predictionData)]
      );
      savedResultId = insertResult.rows[0]?.id;
    } catch (dbErr) {
      console.error('[Upload DB Error] Failed to persist result in database:', dbErr.message);
      // Still return the prediction to user even if DB save fails
    }

    // 4. Return standard prediction response
    return res.status(200).json({
      id: savedResultId,
      source: 'upload',
      inputSummary,
      result: predictionData
    });

  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json({
        error: err.response.data?.detail || err.response.data?.error || 'ML analysis failed.'
      });
    }
    next(err);
  } finally {
    // 5. Always clean up the temporary file from uploads directory
    if (filePath && fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (cleanupErr) {
        console.error('[Upload Cleanup Error] Could not delete temp file:', cleanupErr.message);
      }
    }
  }
};

module.exports = {
  uploadReport
};
