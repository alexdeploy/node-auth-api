module.exports = {
    auth: {
        sign_up: {
            success: {
                code: 200,
                value: 'sign_up_success',
                message: 'Sign up successfull'
            },
            error: {
                email_already_exists: {
                    code: 400,
                    value: 'email_already_exists',
                    message: 'Email already exists'
                },
                username_already_exists: {
                    code: 400,
                    value: 'username_already_exists',
                    message: 'Username already exists'
                },
                incorrect_password: {
                    code: 400,
                    value: 'incorrect_password',
                    message: 'Incorrect password'
                },
                invalid_email: {
                    // In case the email don't match the regex
                    code: 400,
                    value: 'invalid_email',
                    message: 'Invalid email'
                },
                invalid_username: {
                    // In case the username don't match the regex
                    code: 400,
                    value: 'invalid_username',
                    message: 'Invalid username'
                },
                invalid_password: {
                    // In case the password don't match the regex
                    code: 400,
                    value: 'invalid_password',
                    message: 'Invalid password'
                },
            }
        },
        sign_in: {
            success: {
                code: 200,
                value: 'sign_in_success',
                message: 'Sign in success'
            },
            error: {
                user_not_found: {
                    code: 404,
                    value: 'user_not_found',
                    message: 'User not found'
                },
                user_is_locked: {
                    code: 423,
                    value: 'user_is_locked',
                    message: 'User is locked'
                },
                user_is_not_verified: {
                    code: 400,
                    value: 'user_is_not_verified',
                    message: 'User is not verified'
                },
                incorrect_password: {
                    code: 401,
                    value: 'incorrect_password',
                    message: 'Incorrect password'
                },
                invalid_email: {
                    // In case the email don't match the regex
                    code: 400,
                    value: 'invalid_email',
                    message: 'Invalid email. The email does not match the regex'
                },
                invalid_username: {
                    // In case the username don't match the regex
                    code: 400,
                    value: 'invalid_username',
                    message: 'Invalid username. The username does not match the regex'
                },
                invalid_password: {
                    // In case the password don't match the regex
                    code: 400,
                    value: 'invalid_password',
                    message: 'Invalid password. The password does not match the regex'
                },
                max_attempt_reached: {
                    code: 429,
                    value: 'max_attempt_reached',
                    message: 'Max sign in attempts reached'
                },
            }
        },
        forgot_password: {
            success: {},
            error: {}
        },
        reset_password: {
            success: {},
            error: {}
        },
        verify_email: {
            success: {},
            error: {}
        },
        verify_phone: {
            success: {},
            error: {}
        },
        verify_token: {
            success: {},
            error: {}
        },
        server: {
            success: {},
            error: {
                internal: {
                    code: 500,
                    message: 'Internal server error'
                }
            }
        }
    }
}