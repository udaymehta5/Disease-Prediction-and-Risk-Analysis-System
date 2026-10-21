const express = require('express');
const router = express.Router();
const { optionalAuth } = require('../middleware/authMiddleware');
const chatController = require('../controllers/chatController');

// POST /api/chat - Accessible to authenticated users and guests (with patient history when logged in)
router.post('/', optionalAuth, chatController.sendChatMessage);

// POST /api/chat/analyze - Synthesize full clinical prediction from conversation
router.post('/analyze', optionalAuth, chatController.analyzeChat);

module.exports = router;

