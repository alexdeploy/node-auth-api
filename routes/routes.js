const express = require('express');
const router = express.Router();
const { verifySessionToken, verifyResetToken, authorize } = require('../middleware/auth');
const { signInByMail, signUpByMail, signUpByUsername, forgotPassword, resetPassword, verifyEmail } = require('../controllers/user.controller');
const config = require('../api.config');

console.log(config);
const role = {
    admin: { id: 0, name: 'admin', description: 'Administrator' },
    user: { id: 1, name: 'user', description: 'User' },
    guest: { id: 2, name: 'guest', description: 'Guest' },
  }

router.post('/sign-in', signInByMail);
router.post('/sign-up', signUpByMail);
router.post('/verify-email', authorize(role.user, role.admin), verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', verifyResetToken, resetPassword);

router.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;