import * as utils from "./utils.js";

/**
 * The Expense class represents an expense made by a user.
 */
class Expense{

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
     * @param {*} type a string representing a category for the expense
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
     * 
     * @param {*} date a Date() object
     * @returns true if date is a Date() object and has a valid date, 
     * false if date is null, not a Date() object, or has an invalid year, month, or date
     */
    static isValidDate(date){
        if (!utils.isDate(date))
            return false;

        date = new Date();

        let year = date.getFullYear();
        if (isNaN(year))
            return false;
        // TODO: add more year checks

        let month = date.getMonth();
        if (isNaN(month))
            return false;

        let day = date.getDate();
        if (isNaN(day))
            return false;

        return true;
    }
}