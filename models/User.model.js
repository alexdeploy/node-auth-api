const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    username: {
        type: String,
        required: false,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    images: { // ! Not used
        avatar: {
            type: String,
            required: false,
            default: null,
        },
        cover: {
            type: String,
            required: false,
            default: null,
        },
    },
    role: {
        id: {
            type: Number,
            required: true,
            default: 1,
        },
        name: {
            type: String,
            required: true,
            default: 'user',
        }
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    phone: { // ! Not used
        prefix: {
            type: String,
            required: false,
            default: null,
        },
        number: {
            type: Number,
            required: false,
            default: null,
        },
        isVerified: {
            type: Boolean,
            required: false,
            default: false,
        }
    },
    address: {
        street: {
            type: String,
            required: false,
            default: null,
        },
        city: {
            type: String,
            required: false,
            default: null,
        },
        country: {
            type: String,
            required: false,
            default: null,
        },

    },
    security: {
        // TODO: Implementar nueva seguridad
        tokens: {
            session: {
                type: String,
                required: true,
                default: null,
            },
            resetPassword: {
                type: String,
                required: false,
                default: null,
            },
            verifyEmail: {
                type: String,
                required: false,
                default: null,
            },
            verifyPhone: { // ! Not used
                type: String,
                required: false,
                default: null,
            },
        },
        login: { // ! Not used
            attempts: {
                type: Number,
                default: 0,
            },
            lastLogin: {
                type: Date,
                default: null,
            },
            lastLogout: {
                type: Date,
                default: null,
            },
            lastIp: {
                type: String,
                default: null,
            },
            lastBrowser: {
                type: String,
                default: null,
            },
        },
        locked: { // ! Not used
            status: {
                type: Boolean,
                default: false,
            },
            reason: {
                type: String,
                default: null,
            },
            until: {
                type: Date,
                default: null,
            },
        },
        lockReason: {
            type: String,
            default: null,
        },
        logginAttempts: {
            type: Number,
            default: 0,
        },
        accountLockedUntil: {
            type: Date,
            default: null,
            },
    },
    settings: { // ! Not used
        theme: {
            type: String,
            default: null,
        },
        language: {
            type: String,
            default: null,
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: null,
    },
});

// Generate username if not provided
userSchema.pre('save', function (next) {
    if (!this.username) {
      this.username = 'user' + this._id.toString();
    }
    next();
});

/**
 * Model
 * * A class with which we build documents
 */
const User = mongoose.model('user', userSchema);

module.exports = User;