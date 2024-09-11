///////////////////////////////
// Security Configuration
///////////////////////////////

// expiration accepted values: 1m = 1 minute, 1h = 1 hour, 1d = 1 day, 1w = 1 week

/**
 * @module security.config
 * @description Defines the user roles
 */
module.exports = {
    logginAttempts: {
        active: true,
        max: 5,
        lockTime: 1 // minutes
    },
    tokens: {
        session: {
            active: true,
            expiration: '1d' // 1m = 1 minute, 1h = 1 hour, 1d = 1 day, 1w = 1 week
        },
        reset_password: {
            active: true,
            expiration: '1h'
        },
        verification: {
            phone: {
                active: true,
                expiration: '1d'
            },
            email: {
                active: true,
                expiration: '30m'
            }
        },
    }
}