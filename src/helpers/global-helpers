/**
 * Middleware for any endpoints
 */

const express = require('express');

const PlutusErrors = require("../errors/plutus-errors");

const MAX_DATE = "3000-01-01";
const MIN_DATE = "1776-07-04";

const hasParams = function(obj,params){

    if (obj == null || params == null){
        return false;
    }
    
    if (Object.getPrototypeOf(obj) != Object.prototype){
        return false;
    }
    if (Object.getPrototypeOf(params) != Array.prototype){
        return false;
    }

    for (let i = 0; i<params.length;i++){
        let param = params[i];
        if (obj[param] == undefined || obj[param] == null){
            return false;
        }
    }

    return true;
};

/**
 * 
 * @param {Object} obj 
 */
function fixStartDate(obj){
    if (obj.startDate == undefined || obj.startDate == null){
        obj.startDate = new Date(MIN_DATE);
        return;
    }

    if (Object.getPrototypeOf(obj.startDate) == Date.prototype){
        if (obj.startDate < MIN_DATE){
            obj.startDate = new Date(MIN_DATE);
            return;
        }

        if (obj.startDate > MAX_DATE){
            obj.startDate = new Date(MAX_DATE);
        }

        return;
    }

    if (isNaN(new Date(obj.startDate))){
        throw new Error("startDate must be an actual date");
    }
    
    return;
}

/**
 * 
 * @param {Object} obj 
 * @returns 
 */
function fixEndDate(obj){
    if (obj.endDate == undefined || obj.endDate == null){
        obj.endDate = new Date(MAX_DATE);
        return;
    }

    if (Object.getPrototypeOf(obj.endDate) == Date.prototype){
        if (obj.endDate < MIN_DATE){
            obj.endDate = new Date(MIN_DATE);
            return;
        }

        if (obj.endDate > MAX_DATE){
            obj.endDate = new Date(MAX_DATE);
        }

        return;
    }

    if (isNaN(new Date(obj.endDate))){
        throw new Error("endDate must be an actual date");
    }
    
    return;
}

function fixAmountBounds(obj){
    if (obj.amountLowerBound == undefined || obj.amountLowerBound == null || isNaN(obj.amountLowerBound)){
        obj.amountLowerBound = 0;
    }

    if (obj.amountUpperBound == undefined || obj.amountLowerBound == null || isNaN(obj.amountUpperBound)){
        obj.amountUpperBound = Number.MAX_VALUE;
    }

    if (obj.amountLowerBound > 0 && obj.amountUpperBound >= obj.amountLowerBound){
        return;
    }

    throw new PlutusErrors.PlutusamountBoundError("no endpoint");
}
module.exports = {
    hasParams, 
    fixEndDate, 
    fixStartDate,
    fixAmountBounds
};