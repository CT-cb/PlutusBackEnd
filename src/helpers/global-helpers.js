/**
 * Middleware for any endpoints
 */

const express = require('express');

const PlutusErrors = require("../errors/plutus-errors");

const MAX_YEAR = 3000;
const MIN_YEAR = 1776;
const MAX_DATE = "3000-07-04";
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

    if (obj.length < 1){
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

function fixDateDefaultToPresent(obj){
    if (obj.startDate == undefined || obj.startDate == null){
        obj.startDate = new Date().toISOString();
        return;
    }

    let d = new Date(obj.startDate);
    if (isNaN(d)){
        obj.startDate = new Date().toISOString();
        return;
    }

    if (d.getFullYear() < MIN_YEAR){
        obj.startDate = MIN_DATE;
    }

    if (d.getFullYear() > MAX_YEAR){
        obj.startDate = MAX_DATE;
    }

    return;
}

/**
 * 
 * @param {Object} obj 
 */
function fixStartDateDefaultMinDate(obj){
    if (obj.startDate == undefined || obj.startDate == null){
        obj.startDate = MIN_DATE;
        return;
    }

    let d = new Date(obj.startDate);

    if (isNaN(d)){
        obj.startDate = MIN_DATE;
        return;
    }

    if (d.getFullYear() < MIN_YEAR){
        obj.startDate = MIN_DATE;
    }

    if (d.getFullYear() > MAX_YEAR){
        obj.startDate = MAX_DATE;
    }
    
    return;
}

/**
 * 
 * @param {Object} obj 
 * @returns 
 */
function fixEndDateDefaultMaxDate(obj){

    if (obj.endDate == undefined || obj.endDate == null){
        obj.endDate = MAX_DATE;
        return;
    }

    let d = new Date(obj.endDate);

    if (isNaN(d)){
        obj.endDate = MAX_DATE;
        return;
    }

    if (d.getFullYear() < MIN_YEAR){
        obj.endDate = MIN_DATE;
    }

    if (d.getFullYear() > MAX_YEAR){
        obj.endDate = MAX_DATE;
    }
    
    return;
}

function isValidEmail(email){
    return /[A-Za-z0-9\.\_]{1,}@[A-Za-z0-9(.)]+\.[A-Za-z]{2,}/.test(email);
}

function fixAmountBounds(obj){
    if (obj.amountLowerBound == undefined || obj.amountLowerBound == null || isNaN(obj.amountLowerBound)){
        obj.amountLowerBound = 0;
    }

    if (obj.amountLowerBound < 0)
        obj.amountLowerBound = 0;

    if (obj.amountUpperBound == undefined || obj.amountUpperBound == null || isNaN(obj.amountUpperBound)){
        obj.amountUpperBound = Number.MAX_VALUE;
    }

}
module.exports = {
    hasParams, 
    fixEndDateDefaultMaxDate, 
    fixStartDateDefaultMinDate,
    fixDateDefaultToPresent,
    fixAmountBounds,
    MAX_DATE,
    MIN_DATE,
    MAX_YEAR,
    MIN_YEAR
};