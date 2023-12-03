const mongoose = require('mongoose');
const sessionSchema = require('./session-schema.js');
const GlobalHelpers = require('../helpers/global-helpers.js');
const UserSchema = new mongoose.Schema({
    firstName: { // optional, if we want a user to enter their name. Could help with personalization
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate:{
            validator: function(email) {
                return GlobalHelpers.isValidEmail(email);
            },
            message: bad => `${bad} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    }
}/*, {timestamps: true}*/);

/*
UserSchema.methods.updateFields = function(obj){

    if (obj == null)
        return;

    if (obj.email){
        this.email = obj.email;
    }

    if (obj.password){
        this.password = obj.password;
    }

    if (obj.firstName){
        this.firstName = obj.firstName;
    }

    if (obj.lastName){
        this.lastName = obj.lastName;
    }
}*/



const UserModel = mongoose.model('users',UserSchema);

module.exports = UserModel;