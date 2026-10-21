const fs = require('fs');
const axios = require('axios');
const db = require('../config/db');
const mlService = require('../services/mlService');

const ML_SERVICE_URL = (process.env.ML_SERVICE_URL || '').trim();
const hasExternalMlService = ML_SERVICE_URL && 
  !ML_SERVICE_URL.includes('localhost') && 
  !ML_SERVICE_URL.includes('127.0.0.1') && 
  ML_SERVICE_URL !== 'internal';

const uploadReport = async (req, res, next) => {
  const filePath = req.file?.path;

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file was provided.' });
    }

    const fileBuffer = fs.readFileSync(filePath);
    let predictionData = null;

    let extractedText = '';
    try {
      extractedText = await mlService.parseDocument(fileBuffer, req.file.originalname);
    } catch (parseErr) {
      console.warn('[Upload Parse Notice]', parseErr.message);
    }

    // 1. Try external ML service if explicitly configured with an external URL
    if (hasExternalMlService) {
      try {
        const blob = new Blob([fileBuffer], { type: req.file.mimetype });
        const formData = new FormData();
        formData.append('file', blob, req.file.originalname);
        if (req.user && req.user.id) {
          formData.append('user_id', String(req.user.id));
        }

        const mlResponse = await axios.post(`${ML_SERVICE_URL}/analyze-file`, formData, {
          timeout: 45000
        });
        predictionData = mlResponse.data;
      } catch (externalErr) {
        console.warn(`[Upload Notice] External ML service failed (${externalErr.message}). Using built-in native engine.`);
      }
    }

    // 2. Use built-in native Groq ML service
    if (!predictionData) {
      predictionData = await mlService.analyzeHealthRisk(extractedText || 'Patient uploaded medical report file.', req.user?.id || null);
    }

    // 3. Enrich prediction data with patient report content for persistent RAG memory
    const enrichedPredictionData = {
      ...predictionData,
      uploadedReport: {
        filename: req.file.originalname,
        fileSize: req.file.size,
        extractedText: extractedText ? extractedText.slice(0, 5000) : '',
        uploadedAt: new Date().toISOString()
      }
    };

    const inputSummary = `File: ${req.file.originalname} (${(req.file.size / 1024).toFixed(1)} KB)`;

    // 4. Save prediction to Supabase results history table
    let savedResultId = null;
    try {
      const insertResult = await db.query(
        `INSERT INTO results (user_id, source, input_summary, result_json) 
         VALUES ($1, 'upload', $2, $3) 
         RETURNING id`,
        [req.user?.id || 1, inputSummary, JSON.stringify(enrichedPredictionData)]
      );
      savedResultId = insertResult.rows[0]?.id;

      // 5. Also insert document record into documents table for vector/RAG tracking
      try {
        const zeroEmbedding = `[${new Array(384).fill(0).join(',')}]`;
        await db.query(
          `INSERT INTO documents (user_id, content, embedding, metadata)
           VALUES ($1, $2, $3::vector, $4)`,
          [
            req.user?.id || null,
            `Patient Uploaded Report: ${req.file.originalname}\n${extractedText.slice(0, 1500)}`,
            zeroEmbedding,
            JSON.stringify({ source: 'upload', filename: req.file.originalname })
          ]
        );
      } catch (docErr) {
        // Non-critical, results table already has the full report
      }
    } catch (dbErr) {
      console.error('[Upload DB Error] Failed to persist result in database:', dbErr.message);
    }

    // 6. Return standard prediction response
    return res.status(200).json({
      id: savedResultId,
      source: 'upload',
      inputSummary,
      result: predictionData
    });

  } catch (err) {
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

