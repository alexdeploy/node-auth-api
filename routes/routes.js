const express = require('express');
const router = express.Router();
const { authenticateToken, verifyResetToken } = require('../utils/auth');
const { loginByMail, registerByMail, registerByUsername, forgotPassword, resetPassword } = require('../controllers/user.controller');

router.post('/login', loginByMail);
router.post('/register', registerByMail); // Possible to change to registerByUsername
router.post('/forgot-password', forgotPassword);
router.post('/reset-password',verifyResetToken, resetPassword);

module.exports = router;