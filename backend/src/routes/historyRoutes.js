const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const historyController = require('../controllers/historyController');

// All history routes require JWT authentication
router.get('/', authMiddleware, historyController.getHistory);
router.get('/:id', authMiddleware, historyController.getHistoryItem);

module.exports = router;
