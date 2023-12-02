const express = require('express');
const mongoose = require('mongoose');
const PlutusErrors = require('../errors/plutus-errors');
const GlobalHelpers = require('../helpers/global-helpers');
const IncomeHelpers = require('../helpers/income-helpers');
const IncomeModel = require('../models/income-model');
const router = express.Router();
let endpoint = "/incomes";

router.use((req, res, next) => {
    mongoose.connection.useDb('incomes');
    next();
});

router.delete("/delete", async (req,res,next)=>{
    endpoint += "/delete";
    try{
        if (req.query.incomeIds == undefined || req.query.incomeIds == null){
            throw new PlutusErrors.PlutusMissingRequestParamsError(endpoint);
        }

        let email = req.query.email;
        let incomeIds = req.query.incomeIds.split(",");

        incomeIds.forEach(async (incomeId)=>{
            let result = await IncomeModel.deleteMany({
                email: email,
                incomeId: incomeId
            });
            console.log(result);
        })
        
        /*let results = await IncomeModel.where("email").equals(email).where("incomeId").equals(incomeId);
        if (results.length > 0){
            results.forEach((result)=>{
                result.deleteOne();
            });
        }*/

        res.status(200);
        res.json({
            "status":"income_delete_success"
        })
    } catch (err){
        next(err);
    }
});

router.post("/add", async (req, res, next) => {
    endpoint += "/add";
    try {
        if (!IncomeHelpers.hasCorrectAttributes(req.body)) {
            throw new PlutusErrors.PlutusBadJsonRequestError(endpoint);
        }

        let email = req.body.email;
        let amount = req.body.amount;
        let incomeDate = req.body.incomeDate;
        let type = req.body.type;
        //let source = req.body.source;
        let currency = req.body.currency;

        let income = new IncomeModel({
            email: email,
            amount: amount,
            currency: currency,
            type: type,
            incomeDate: incomeDate,
        });

        if (req.body.source) {
            income.source = req.body.source;
        }

        income.save();

        res.status(200);
        res.json({
            "status": "income_add_success"
        });

    } catch (err) {
        next(err);
    }
});
/**
 * {
 *  
 * }
 */

router.get("/all", async (req, res, next) => {
    endpoint += "/all";
    try {
        console.log(req.query);
        console.log(req.params);
        if (!GlobalHelpers.hasParams(
            req.query,
            ["email"]
        )) {
            throw new PlutusErrors.PlutusMissingRequestParamsError(endpoint);
        }

        let email = req.query.email;
        let results = await IncomeModel.where("email").equals(email);
        if (results == undefined || results == null) {
            throw new Error("placeholder error");
        }
        console.log(results);
        console.log(results[0]);
        res.status(200);
        res.json(results);
    } catch (err) {
        next(err);
    }
});

router.get("/bydaterange", async (req, res, next) => {
    endpoint += "/bydaterange";
    try {

        GlobalHelpers.fixStartDate(req.query);
        GlobalHelpers.fixEndDate(req.query);

        if (!GlobalHelpers.hasParams(
            req.query,
            ["email",
                "startDate",
                "endDate"]
        )) {
            throw new PlutusErrors.PlutusMissingRequestParamsError(endpoint);
        }

        let email = req.query.email;
        let startDate = new Date(req.query.startDate);
        let endDate = new Date(req.query.endDate);
        console.log(email);
        console.log(startDate);
        console.log(endDate);
        console.log("==== here");
        // construct query
        let results = await IncomeModel
            .where("email").equals(email)
            .where("incomeDate").gte(startDate.toISOString()).lte(endDate.toISOString());


        if (results == undefined || results == null) {
            throw new Error("placeholder error");
        }

        res.status(200);
        res.json(results);

    } catch (err) {
        next(err);
    }
});

router.get("/bytype", async (req, res, next) => {
    endpoint += "/bytype";
    console.log("/bytype endpoint");
    try {
        if (!GlobalHelpers.hasParams(
            req.query,
            ["email",
                "types"]
        )) {
            throw new PlutusErrors.PlutusMissingRequestParamsError(endpoint);
        }

        let email = req.query.email;
        let types = req.query.types.split(",");
        if (types.length > 10) {
            console.log("Can only have 10 types max");
            types = types.slice(0, 10);
        }

        types.forEach((type) => {
            if (!typeof type === 'string' && !type instanceof String) {
                type == "nullString";
            }
        });

        let results = [];
        for (let i = 0; i < types.length; i++) {
            let type = types[i];
            let query_results = await IncomeModel
                .where("email").equals(email)
                .where("type").equals(type);

            query_results.forEach((result) => {
                results.push(result);
            });
        }

        res.status(200);
        res.json(results);

    } catch (err) {
        next(err);
    }
});

router.get("/bytype_daterange", async (req, res, next) => {

    try {

        GlobalHelpers.fixStartDate(req.query);
        GlobalHelpers.fixEndDate(req.query);

        if (!GlobalHelpers.hasParams(
            req.query,
            ["email",
                "types",
                "startDate",
                "endDate"]
        )) {
            throw new PlutusErrors.PlutusMissingRequestParamsError(endpoint);
        }

        let email = req.query.email;
        let startDate = new Date(req.query.startDate);
        let endDate = new Date(req.query.endDate);
        let types = req.query.types.split(",");
        if (types.length > 10) {
            console.log("Can only have 10 types max");
            types = types.slice(0, 10);
        }

        types.forEach((type) => {
            if (!typeof type === 'string' && !type instanceof String) {
                type == "nullString";
            }
        });

        console.log(types);
        console.log(startDate);
        console.log(endDate);

        let results = [];
        for (let i = 0; i < types.length; i++) {
            let type = types[i];
            let query_results = await IncomeModel
                .where("email").equals(email)
                .where("incomeDate").gte(startDate.toISOString()).lte(endDate.toISOString())
                .where("type").equals(type)
                ;
            console.log(query_results);
            query_results.forEach((result) => {
                results.push(result);
            });
        }

        res.status(200);
        res.json(results);
    } catch (err) {
        next(err);
    }
});

router.get("/byamount", async (req, res, next) => {

    try {
        GlobalHelpers.fixAmountBounds(req.query);
        if (!GlobalHelpers.hasParams(
            req.query,
            ["email",
                "amountLowerBound",
                "amountUpperBound"]
        )) {
            throw new PlutusErrors.PlutusMissingRequestParamsError(endpoint);
        }

        let email = req.query.email;
        let lowerBound = req.query.amountLowerBound;
        let upperBound = req.query.amountUpperBound;

        let results = await IncomeModel
            .where("email").equals(email)
            .where("amount").gte(lowerBound).lte(upperBound);

        res.status(200);
        res.json(results);
    } catch (err) {
        next(err);
    }
});

router.get("/byamount_daterange", async (req, res, next) => {

    try {
        GlobalHelpers.fixAmountBounds(req.query);
        GlobalHelpers.fixStartDate(req.query);
        GlobalHelpers.fixEndDate(req.query);

        if (!GlobalHelpers.hasParams(
            req.query,
            ["email",
                "amountLowerBound",
                "amountUpperBound",
                "startDate",
                "endDate"]
        )) {
            throw new PlutusErrors.PlutusMissingRequestParamsError(endpoint);
        }

        let email = req.query.email;
        let lowerBound = req.query.amountLowerBound;
        let upperBound = req.query.amountUpperBound;
        let startDate = new Date(req.query.startDate);
        let endDate = new Date(req.query.endDate);
        let results = await IncomeModel
            .where("email").equals(email)
            .where("incomeDate").gte(startDate.toISOString()).lte(endDate.toISOString())
            .where("amount").gte(lowerBound).lte(upperBound);

        res.status(200);
        res.json(results);
    } catch (err) {
        next(err);
    }
});



module.exports = router;