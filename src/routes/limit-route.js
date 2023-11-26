const express = require('express');
const mongoose = require('mongoose');
const PlutusErrors = require('../errors/plutus-errors');
const GlobalHelpers = require('../helpers/global-helpers');
const LimitHelpers = require('../helpers/limit-helpers');
const LimitModel = require('../models/limit-model');
const router = express.Router();

let endpoint = "/limits";

router.use((req, res, next) => {
    mongoose.connection.useDb('limits');
    next();
});

router.post("/add",async (req,res,next)=>{

});

router.delete("/delete", async (req,res,next)=>{
    
})

module.exports = router;