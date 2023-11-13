const mongoose = require('mongoose');
const sessionSchema = require('./session-schema.js').sessionSchema;

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdDatetime: {
        type: Date,
        required: true
    },
    activeSessions: {
        type: String, // TODO: this is not the right way to express this!
        required: true
    }
});

let UserModel = mongoose.model('User',userSchema);