import * as utils from "./utils.js";

/**
 * The Income class represents income deposited by a user.
 */
export class Income{

    type;
    amount;
    date;

    constructor(type,amount,date){
        if (!isValidType(type))
            throw TypeError("Type is not valid. Must be a non-empty string.");

        if (!isValidAmount(amount))
            throw TypeError("Amount is not valid. Must be a non-negative number.");

        if (!isValidDate(date))
            throw Error("Date is invalid. Must be a Date() object with at least a viable day, month, and year.");

        this.type = type;
        this.amount = amount;
        this.date = date;
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

    /**
     * 
     * @param {*} amount an int or floating point representing a non-negative dollar amount
     * @returns true if amount is a non-zero number, false if otherwise
     */
    static isValidAmount(amount){
        if (!utils.isNumber(amount))
            return false;

        return amount >= 0;
    }

/**
 * @param {Date} date - The Date object to validate
 * @returns {boolean} - True if the date is a valid Date object with a valid year, month, and day, otherwise false.
 */
static isValidDate(date) {
    if (date instanceof Date && !isNaN(date)) {
        // Check if the year, month, and day are valid
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            return true;
        }
    }
    return false;
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

