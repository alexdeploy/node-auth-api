const express = require('express');
const router = express.Router();
const { authenticateToken, verifyResetToken } = require('../middleware/auth');
const { loginByMail, registerByMail, registerByUsername, forgotPassword, resetPassword, verifyMail } = require('../controllers/user.controller');

router.post('/login', loginByMail);
router.post('/register', registerByMail); // Possible to change to registerByUsername
router.get('/verify', verifyMail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password',verifyResetToken, resetPassword);

module.exports = router;