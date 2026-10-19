const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const mcqController = require('../controllers/mcqController');

// POST /api/mcq/next - Fetch next adaptive question
router.post('/next', authMiddleware, mcqController.getNextQuestion);

// POST /api/mcq/result - Submit quiz answers and retrieve prediction
router.post('/result', authMiddleware, mcqController.submitResult);

module.exports = router;
