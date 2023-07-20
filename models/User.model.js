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
    phone: {
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
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        default: null,
    },
    security: {
        logginAttempts: {
            type: Number,
            default: 0,
        },
        accountLockedUntil: {
            type: Date,
            default: null,
        },
    },
    settings: {
        type: Object,
        default: {
            theme: {
                type: String,
                default: null,
            },
            language: {
                type: String,
                default: null,
            },
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
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