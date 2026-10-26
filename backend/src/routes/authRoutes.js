const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/google', authController.googleLogin);
router.get('/google/config', authController.getGoogleConfig);

// Protected profile route
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
