import * as utils from "./utils.js";

/**
 * The Expense class represents an expense made by a user.
 */
export class Expense{

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

/**
 * 
 * @param {string} userId the unique ID of the user
 * @param {Date} startDate The earliest date for which to return transactions
 * @param {Date} endDate The latest date for which to return transations
 * @returns 
 */
export function getAllExpenses(userId, startDate = null, endDate = null){
    return null;
}

/**
 * Return the earliest chronological expense stored by the user.
 * @param {string} userId the unique ID of the user
 * @returns 
 */
export function getEarliestExpense(userId){
    return null;
}

/**
 * Return a count of all expenses stored by the user.
 * 
 * @param {string} userId the unique ID of the user
 * @returns an integer count of the number of expenses stored by the user.
 */
export function getExpensesCount(userId){
    return null;
}

/**
 * Add an expense to the list of expenses.
 *
 * @param {Object} expenseData - The expense data to be added.
 * @param {Array} expenses - The array of expenses to which the expenseData will be added.
 */
export function addExpense(expenseData, expenses) {
    // ... (function code)
  }
  
  /**
   * Delete an expense by ID from the list of expenses.
   *
   * @param {number} expenseId - The ID of the expense to be deleted.
   * @param {Array} expenses - The array of expenses from which the expense will be deleted.
   * @returns {boolean} Returns true if the expense was deleted, false if the ID was not found.
   */
  export function deleteExpense(expenseId, expenses) {
    // ... (function code)
  }

