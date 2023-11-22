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
        required: true,
        lowercase: true,
        unique: true
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

UserSchema.methods.toAuthJSON = function(){
    return {
        //userId: this.userId,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        //activeSession: this.activeSessions
    };
};

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
}

UserSchema.statics.findUser = async function(
    email, 
    password, 
    firstName = null, 
    lastName = null
    ){
        let results = await this.where("email").equals(email);
        if (results.length == 0)
            throw new PlutusError("user_not_found",)

        if (results.length == 1)
            return results[0];

        throw new Error(`Found more than one such user!\nHere's the result:\n${results}`);
}

const UserModel = mongoose.model('users',UserSchema);
//
// THe below code is a form of inheritance for mongoose models. Think of the UserModel as
// the parent class, and NewUserAccount and ExistingUserAccount as the 
//

/**
 * NewUserAccount is used only for ingestion of a new account into MongoDB
 */
/* const NewUserAccount = UserModel.discriminator('NewUserAccount', new mongoose.Schema({
    password:{
        type: String,
        required: true
    }
})); */

/**
 * UserAccount is used only for the extraction of an existing account from MongoDB
 */
/* const ExistingUserAccount = UserModel.discriminator('UserAccount', new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    activeSessions: { // again, why do I care about this for account creation?
        type: [sessionSchema], // An array of sessionSchema objects
        required: false
    }
})); */

module.exports = UserModel;