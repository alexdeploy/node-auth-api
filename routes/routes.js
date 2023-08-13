const express = require('express');
const router = express.Router();
const { verifySessionToken, verifyResetToken, authorize } = require('../middleware/auth');
const { signInByMail, signUpByMail, signUpByUsername, forgotPassword, resetPassword, verifyEmail, verifyPhone } = require('../controllers/user.controller');

const config = require('../api.config');
const slug = config.domain.route.auth.slug;
const role = config.roles;

router.post(slug.sign_in, signInByMail);

router.post(slug.sign_up, signUpByMail);

router.post(slug.forgot_password, forgotPassword);

router.post(slug.reset_password, verifyResetToken, resetPassword);

router.post(slug.verify_email, authorize(role.user, role.admin), verifyEmail);

router.get('/', (req, res) =>{
    res.send('Auth route');
})

// TODO: /verify-phone
// router.post(slug.verify_phone, verifyPhone);

// TODO: /refresh-token (como ruta o como middleware?)

module.exports = router;