const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { uploadSingleFile } = require('../middleware/uploadMiddleware');
const uploadController = require('../controllers/uploadController');

// POST /api/upload - Protected by JWT auth and Multer file upload
router.post('/', authMiddleware, uploadSingleFile, uploadController.uploadReport);

module.exports = router;
