require('dotenv').config();

module.exports = {
    name: {
        prod_server: 'https://api.alexrueda.dev',
        prod_client: 'https://app.alexrueda.dev',
        dev_server: 'http://localhost',
        dev_client: 'http://localhost'
    },
    port: {
        server: process.env.PORT_SERVER || 5000,
        client: process.env.PORT_CLIENT || 9000
    },
    route: {
        auth: {
            root: '/auth', // Recomended: '/auth', '/api', '/user'
            slug: {
                sign_in: '/sign-in',
                sign_up: '/sign-up',
                forgot_password: '/forgot-password',
                reset_password: '/reset-password',
                verify_email: '/verify-email',
                verify_phone: '/verify-phone', // TODO: Implement
                refresh_token: '/refresh-token', // TODO: Implement
                logout: '/logout' // TODO: Implement
            }
        },
    }
}
