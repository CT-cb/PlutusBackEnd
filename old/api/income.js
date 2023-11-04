import * as utils from "./utils.js";

/**
 * The Income class represents income deposited by a user.
 * 
 * Author: Mariam Minhas
 */
export class Income {

    id;
    type;
    amount;
    date;
    createdDate;

    constructor(type,amount,date){
        if (!isValidType(type))
            throw TypeError("Type is not valid. Must be a non-empty string.");

        if (!utils.isValidAmount(amount))
            throw TypeError("Amount is not valid. Must be a non-negative number.");

        if (!utils.isValidDate(date))
            throw Error("Date is invalid. Must be a Date() object with at least a viable day, month, and year.");

        this.id = utils.generateUuid();
        this.type = type;
        this.amount = amount;
        this.date = date;

        this.createdDate = Date.now();
    }

    /**
     * 
     * @param {*} type a string representing a category for the Income
     * @returns true if type is a non-null, non-empty string, false if otherwise
     */
    static isValidType(type){
        if (!utils.isString(type))
            return false;
        
        return type.length > 0;
    }

    
}

/**
 * 
 * @param {string} userId the unique ID of the user
 * @param {Date} startDate The earliest date for which to return income deposits
 * @param {Date} endDate The latest date for which to return income deposits
 * @returns null
 */
export function getAllIncome(userId, startDate = null, endDate = null){
    return null;
}

/**
 * Return the earliest chronological income stored by the user.
 * (probably just using this for sanity checks when testing?)
 * @param {string} userId the unique ID of the user
 * @returns 
 */
export function getEarliestIncome(userId){
    return null;
}

/**
 * Return a count of all Income input by the user.
 * 
 * @param {string} userId the unique ID of the user
 * @returns an integer count of the number of Incomes input by the user.
 */
export function getIncomeCount(userId){
    return null;
}

/**
 * 
 * @param {string} userId the unique ID of the user
 * @returns 
 */
export function getMostRecentIncome(userId){
    return null;
}

