require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connection = mongoose.connection;

// Collin: I have no idea if this is how we can specific the collection/db we use
const usersCollection = connection.collection('users');
const db = connection.db("users-db");

const router = express.Router();

const UserModel = mongoose.model('User');
const NewUserAccount = mongoose.model('NewUserAccount');


console.log("Well, we're here...");
// /auth/create endpoint for creating a new account
router.post("/create",async (req,res) => {

    // Below is some temporary BS to make sure this function works
    let email = req.body["email"];
    let pw = req.body["password"];
    let firstName = req.body["firstName"] ? req.body["firstName"] : "New";
    let lastName = req.body["lastName"] ? req.body["lastName"] : "User";
    
    // TODO: The below code is not working
    await NewUserAccount.create({
        email: email, 
        password: pw,
        firstName: firstName,
        lastName: lastName
    })
    .then(result => {
        console.log(result); //TODO: add something here
    });

});

module.exports = router;