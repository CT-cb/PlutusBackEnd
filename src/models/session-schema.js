const mongoose = require('mongoose');

// thought about using these to represent objects in the activeSessions array for Users
const sessionSchema = new mongoose.Schema({
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
})

//following added
module.exports = {
    sessionSchema: sessionSchema,
  };