const mongoose = require('mongoose');
const sessionSchema = require('./session-schema.js');

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
        required: true
    }
}, {timestamps: true});

UserSchema.methods.toAuthJSON = function(){
    return {
        //userId: this.userId,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        //activeSession: this.activeSessions
    };
};

const UserModel = mongoose.model('User',UserSchema);

//
// THe below code is a form of inheritance for mongoose models. Think of the UserModel as
// the parent class, and NewUserAccount and ExistingUserAccount as the 
//

/**
 * NewUserAccount is used only for ingestion of a new account into MongoDB
 */
const NewUserAccount = UserModel.discriminator('NewUserAccount', new mongoose.Schema({
    password:{
        type: String,
        required: true
    }
}));

/**
 * UserAccount is used only for the extraction of an existing account from MongoDB
 */
const ExistingUserAccount = UserModel.discriminator('UserAccount', new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    activeSessions: { // again, why do I care about this for account creation?
        type: [sessionSchema], // An array of sessionSchema objects
        required: false
    }
}));