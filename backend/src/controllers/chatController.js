const axios = require('axios');

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
      timeout: 30000 // 30s timeout
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

module.exports = {
  sendChatMessage
};
