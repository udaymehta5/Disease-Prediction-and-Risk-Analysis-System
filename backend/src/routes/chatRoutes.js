const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const chatController = require('../controllers/chatController');

// POST /api/chat - Protected by JWT auth
router.post('/', authMiddleware, chatController.sendChatMessage);

module.exports = router;
