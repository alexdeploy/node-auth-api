const express = require('express');
const router = express.Router();
const { verifySessionToken, verifyResetToken } = require('../middleware/auth');
const { signInByMail, signUpByMail, signUpByUsername, forgotPassword, resetPassword, verifyEmail } = require('../controllers/user.controller');

router.post('/sign-in', signInByMail);
router.post('/sign-up', signUpByMail);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', verifyResetToken, resetPassword);

module.exports = router;