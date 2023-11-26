const express = require('express');
const mongoose = require('mongoose');
const PlutusErrors = require('../errors/plutus-errors');
const GlobalHelpers = require('../helpers/global-helpers');
const ExpenseHelpers = require('../helpers/expense-helpers');
const ExpenseModel = require('../models/expense-model');
const router = express.Router();
let endpoint = "/expenses";

router.use((req, res, next) => {
    mongoose.connection.useDb('expenses');
    next();
});

router.delete("/delete", async (req,res,next)=>{
    endpoint += "/delete";
    try{
        if (req.query.expenseIds == undefined || req.query.expenseIds == null){
            throw new PlutusErrors.PlutusMissingRequestParamsError(endpoint);
        }

        let user = req.query.user;
        let expenseIds = req.query.expenseIds.split(",");

        expenseIds.forEach(async (expenseId)=>{
            let result = await ExpenseModel.deleteMany({
                user: user,
                expenseId: expenseId
            });
            console.log(result);
        })
        
        /*let results = await ExpenseModel.where("user").equals(user).where("expenseId").equals(expenseId);
        if (results.length > 0){
            results.forEach((result)=>{
                result.deleteOne();
            });
        }*/

        res.status(200);
        res.json({
            "status":"expense_delete_success"
        })
    } catch (err){
        next(err);
    }
});

router.post("/add", async (req, res, next) => {
    endpoint += "/add";
    try {
        console.log(req.body.length);
        if (!ExpenseHelpers.hasCorrectAttributes(req.body)) {
            throw new PlutusErrors.PlutusBadJsonRequestError(endpoint);
        }

        let user = req.body.user;
        let amount = req.body.amount;
        let method = req.body.method;
        let expenseDate = req.body.expenseDate;
        let type = req.body.type;
        //let payee = req.body.payee;
        let currency = req.body.currency;

        let expense = new ExpenseModel({
            user: user,
            amount: amount,
            currency: currency,
            method: method,
            expenseDate: expenseDate,
        });

        if (req.body.payee) {
            expense.payee = req.body.payee;
        }

        if (req.body.type) {
            expense.type = req.body.type;
        }
        expense.save();

        res.status(200);
        res.json({
            "status": "expense_add_success",
            "id":expense.expenseId
        });

    } catch (err) {
        next(err);
    }
});

router.post("/add_multiple",async(req,res,next)=>{
    try{
        throw new Error("This endpoint is disabled.");
        let expensesToAdd = [];
        let successfulExpensesIds = [];
        let expensesThatFailed = [];

        if (req.body.length == undefined){
            expensesToAdd.push(req.body); // just one expense was given - the JSON isn't an array
        } else {
            for (let i=0;i<req.body.length;i++){
                expensesToAdd.push(req.body[i]);
            }
        }

        expensesToAdd.forEach((expenseToAdd)=>{
            try{
                if (!ExpenseHelpers.hasCorrectAttributes(expense)) {
                    throw new PlutusErrors.PlutusBadJsonRequestError(endpoint);
                }

                let user = req.body.user;
                let amount = req.body.amount;
                let method = req.body.method;
                let expenseDate = req.body.expenseDate;
                let type = req.body.type;
                //let payee = req.body.payee;
                let currency = req.body.currency;

                let expense = new ExpenseModel({
                    user: user,
                    amount: amount,
                    currency: currency,
                    method: method,
                    expenseDate: expenseDate,
                });

                if (req.body.payee) {
                    expense.payee = req.body.payee;
                }

                if (req.body.type) {
                    expense.type = req.body.type;
                }
                expense.save();
                successfulExpensesIds.push(expense.expenseId);
            } catch (err) {
                expensesThatFailed.push(expenseToAdd);
            }
        });

        let status = "expenses_add"

        if (successfulExpensesIds.length == expensesToAdd.length){
            status+="_all_success";
        } else if (expensesThatFailed.length == expensesToAdd.length){
            status+="_all_failure";
        } else {
            status+="_some_success_some_failure";
        }

        res.status(200);
        res.json({
            "status": status,
            "ids":successfulExpensesIds,
            "failures":expensesThatFailed
        });
    } catch (err){
        next(err);
    }
})
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
            ["user"]
        )) {
            throw new PlutusErrors.PlutusMissingRequestParamsError(endpoint);
        }

        let user = req.query.user;

        let results = await ExpenseModel.where("user").equals(user);
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
            ["user",
                "startDate",
                "endDate"]
        )) {
            throw new PlutusErrors.PlutusMissingRequestParamsError(endpoint);
        }

        let user = req.query.user;
        let startDate = new Date(req.query.startDate);
        let endDate = new Date(req.query.endDate);
        console.log(user);
        console.log(startDate);
        console.log(endDate);
        console.log("==== here");
        // construct query
        let results = await ExpenseModel
            .where("user").equals(user)
            .where("expenseDate").gte(startDate.toISOString()).lte(endDate.toISOString());


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
            ["user",
                "types"]
        )) {
            throw new PlutusErrors.PlutusMissingRequestParamsError(endpoint);
        }

        let user = req.query.user;
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
            let query_results = await ExpenseModel
                .where("user").equals(user)
                .where("type").equals(type);
            
            query_results.forEach((result)=>{
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
            ["user",
                "types",
                "startDate",
                "endDate"]
        )) {
            throw new PlutusErrors.PlutusMissingRequestParamsError(endpoint);
        }

        let user = req.query.user;
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
            let query_results = await ExpenseModel
                .where("user").equals(user)
                .where("expenseDate").gte(startDate.toISOString()).lte(endDate.toISOString())
                .where("type").equals(type)
                ;
            console.log(query_results);
            query_results.forEach((result)=>{
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
            ["user",
                "amountLowerBound",
                "amountUpperBound"]
        )) {
            throw new PlutusErrors.PlutusMissingRequestParamsError(endpoint);
        }

        let user = req.query.user;
        let lowerBound = req.query.amountLowerBound;
        let upperBound = req.query.amountUpperBound;

        let results = await ExpenseModel
        .where("user").equals(user)
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
            ["user",
                "amountLowerBound",
                "amountUpperBound",
                "startDate",
                "endDate"]
        )) {
            throw new PlutusErrors.PlutusMissingRequestParamsError(endpoint);
        }

        let user = req.query.user;
        let lowerBound = req.query.amountLowerBound;
        let upperBound = req.query.amountUpperBound;
        let startDate = new Date(req.query.startDate);
        let endDate = new Date(req.query.endDate);
        let results = await ExpenseModel
        .where("user").equals(user)
        .where("expenseDate").gte(startDate.toISOString()).lte(endDate.toISOString())
        .where("amount").gte(lowerBound).lte(upperBound);

        res.status(200);
        res.json(results);
    } catch (err) {
        next(err);
    }
});



module.exports = router;