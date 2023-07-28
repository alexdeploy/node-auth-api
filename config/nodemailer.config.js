///////////////////////////////
// Nodemailer Configuration
///////////////////////////////

/**
 * @module security.config
 * @description Defines the user roles
 */

module.exports = {
    reset_psw: {
        from: 'Alex Deploy Reset',
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
            user: 'noreply@alexrueda.dev'
        },
        content: {
            subject: 'Reset your password',
            html: ''
        },
        front_url: '/reset-password'
    },
    verify_email: {
        from: 'Alex Deploy Verify',
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
            user: 'noreply@alexrueda.dev'
        },
        content: {
            subject: 'Verify your email',
            html: ''
        }
    }
}