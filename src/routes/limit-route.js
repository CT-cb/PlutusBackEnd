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
    endpoint += "/add";
    try {
        GlobalHelpers.fixDateDefaultToPresent(req.body);
        GlobalHelpers.fixEndDateDefaultMaxDate(req.body);

        if (!LimitHelpers.hasCorrectAttributes(req.body)) {
            throw new PlutusErrors.PlutusBadJsonRequestError(endpoint);
        }
        
        let email = req.body.email;

        let startDate = req.body.startDate;
        let endDate = req.body.startDate;

        let timeDivision = req.body.timeDivision;
        let maxLimit = req.body.maxLimit;
        
        let currency = "usd";
        if (req.body.currency){
            currency = req.body.currency;
        }

        let limit = new LimitModel({
            email: email,
            startDate: startDate,
            endDate: endDate,
            timeDivision: timeDivision,
            maxLimit: maxLimit,
            currency: currency,
        });

        limit.save();

        res.status(200);
        res.json({
            "status": "limit_add_success",
            "id":limit.limitId
        });

    } catch (err) {
        next(err);
    }
});


router.get("/all", async (req, res, next) => {
    endpoint += "/all";
    try {

        if (!GlobalHelpers.hasParams(
            req.query,
            ["email"]
        )) {
            throw new PlutusErrors.PlutusMissingRequestParamsError(endpoint);
        }

        let email = req.query.email;

        let results = await LimitModel.where("email").equals(email);

        res.status(200);
        res.json(results);
    } catch (err) {
        next(err);
    }
});

router.delete("/delete", async (req,res,next)=>{
    endpoint += "/delete";
    try{
        if (req.query.email == undefined || req.query.limitIds == null){
            throw new PlutusErrors.PlutusMissingRequestParamsError(endpoint);
        }

        let email = req.query.email;
        let limitIds = req.query.limitIds.split(",");
        //let limitId = req.query.limitId;
        limitIds.forEach(async (limitId)=>{
            let result = await LimitModel.deleteMany({
                email: email,
                limitId: limitId
            });
        })
        // let result = await LimitModel.deleteOne({
        //     email: email,
        //     limitId: limitId
        // });
        res.status(200);
        res.json({
            "status":"limit_delete_success"
        })
    } catch (err){
        next(err);
    }
});

module.exports = router;