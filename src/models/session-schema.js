/**
 * The Session Schema represents a user's login session.
 * This is used in the User Schema to represent an active session by the user.
 */

const mongoose = require('mongoose');

// thought about using these to represent objects in the activeSessions array for Users
let sessionSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true
    },
    os: {
        type: String,
        required: true
    },
    firstLogin: {
        type: Date,
        required: true
    },
    lastLogin: {
        type: Date
    }
});

module.exports = sessionSchema;