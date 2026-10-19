const db = require('../config/db');

// GET /api/history
const getHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const result = await db.query(
      `SELECT id, source, input_summary, result_json, created_at 
       FROM results 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [userId]
    );

    return res.status(200).json({
      history: result.rows
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/history/:id
const getHistoryItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const result = await db.query(
      `SELECT id, source, input_summary, result_json, created_at 
       FROM results 
       WHERE id = $1 AND user_id = $2 
       LIMIT 1`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Assessment record not found.' });
    }

    return res.status(200).json({
      item: result.rows[0]
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getHistory,
  getHistoryItem
};
