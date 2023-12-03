//require('dotenv').config();
//const { PlutusError } = require('../errors/plutus-errors');
const PlutusErrors = require('../errors/plutus-errors');
//equire('../models/user-model');
const express = require('express');
const mongoose = require('mongoose');
const connection = mongoose.connection;
const AuthHelpers = require("../helpers/auth-helpers");
// Collin: I have no idea if this is how we can specific the collection/db we use
/*const usersCollection = connection.collection('users');
usersCollection.dbName = "users-db";*/

let endpoint = "auth";

const router = express.Router();
const UserModel = require('../models/user-model');

//router.use(express.json());
router.use((req, res, next) => {
    connection.useDb("usersdb");
    next();
});

// /auth/create endpoint for creating a new account
router.post("/create", async (req, res, next) => {
    try {
        if (!AuthHelpers.hasLoginKeys(req.body)) {
            throw new PlutusErrors.PlutusBadJsonRequestError(endpoint);
        }

        let email = req.body.email;
        let password = req.body.password;
        let firstName = req.body.firstName || "Generic";
        let lastName = req.body.lastName || "User";

        let newUser = new UserModel({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        });

        await newUser.save();

        res.status(200);
        res.json({
            status: "create_account_success"
        });

    } catch (err) {
        next(err);
    }
});

router.delete("/delete", async (req, res, next) => {
    try {
        if (!AuthHelpers.hasLoginKeys(req.body)) {
            throw new PlutusErrors.PlutusBadJsonRequestError(endpoint);
        }

        let email = req.body.email;
        let password = req.body.password;

        let user_doc = await UserModel.where("email").equals(email);
        if (user_doc == null || user_doc == undefined || user_doc[0] == undefined || user_doc[0] == null) {
            throw new PlutusErrors.PlutusUserNotFoundDbError(endpoint);
        }

        if (user_doc[0].password != password) {
            throw new PlutusErrors.PlutusPasswordMismatchDbError(endpoint);
        }

        console.log(user_doc);
        console.log(user_doc[0]);

        await UserModel.deleteOne({ email: email });

        res.status(200);
        res.json({
            "status": "delete_account_success"
        });

    } catch (err) {
        next(err);
    }
});

router.put("/update", async (req, res, next) => {
    try {
        if(!AuthHelpers.hasLoginKeys(req.body)){
            throw new PlutusErrors.PlutusBadJsonRequestError(endpoint);
        }

        let email = req.body.email;
        let password = req.body.password;

        // gonna do this an unsophisticated way to start out

        let user_doc = await UserModel.where("email").equals(email);
        if (user_doc == null || user_doc == undefined || user_doc[0] == undefined || user_doc[0] == null) {
            throw new PlutusErrors.PlutusUserNotFoundDbError(endpoint);
        }

        if (user_doc[0].password != password) {
            throw new PlutusErrors.PlutusPasswordMismatchDbError(endpoint);
        }

        let doc = user_doc[0];
 
        doc.email = email;
        doc.password = password;
    
        if (req.body.firstName){
            doc.firstName = req.body.firstName;
        }
    
        if (req.body.lastName){
            doc.lastName = req.body.lastName;
        }

        doc.save(); 

        res.status(200);
        res.json({
            "status":"update_account_success"
        });

    } catch (err) {
        next(err);
    }
});
router.post("/login", async (req, res, next) => {
    try {
        // does req.body contains email and password keys?
        if (!AuthHelpers.hasLoginKeys(req.body)) {
            throw new PlutusErrors.PlutusBadJsonRequestError(endpoint);
        }

        // TODO: decrypt password? Implement later w/ encryption
        //

        let email = req.body.email;
        let password = req.body.password;

        // gonna do this an unsophisticated way to start out

        let user_doc = await UserModel.where("email").equals(email);
        if (user_doc == null || user_doc == undefined || user_doc[0] == undefined || user_doc[0] == null) {
            throw new PlutusErrors.PlutusUserNotFoundDbError(endpoint);
        }

        if (user_doc[0].password != password) {
            throw new PlutusErrors.PlutusPasswordMismatchDbError(endpoint);
        }



        res.status(200);
        res.json({
            status: "auth_success"
        });

        // Update last login time
        // TODO: his will be an instance method built into the UserModel itself
    } catch (err) {
        next(err);
    }
});

module.exports = router;