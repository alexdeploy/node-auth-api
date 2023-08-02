const mongoose = require('mongoose');

const securitySchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    tokens: {
        session: {
            type: String,
            required: true,
            default: null,
        },
        reset: {
            type: String,
            required: false,
            default: null,
        },
        verification: {
            phone: {
                type: String,
                required: false,
                default: null,
            },
            email: {
                type: String,
                required: false,
                default: null,
            }
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
});