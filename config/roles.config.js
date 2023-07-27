///////////////////////////////
// User Roles
///////////////////////////////

/**
 * @module roles.config
 * @description Defines the user roles
 */

module.exports = {
    admin: {
        id: 0,
        name: 'admin',
        description: 'Administrator'
    },
    user: {
        id: 1,
        name: 'user',
        description: 'User'
    },
    guest: {
        id: 2,
        name: 'guest',
        description: 'Guest'
    },
}