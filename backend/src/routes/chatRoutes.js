const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const chatController = require('../controllers/chatController');

// POST /api/chat - Protected by JWT auth
router.post('/', authMiddleware, chatController.sendChatMessage);

// POST /api/chat/analyze - Synthesize full clinical prediction from conversation
router.post('/analyze', authMiddleware, chatController.analyzeChat);

module.exports = router;
