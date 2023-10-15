import * as utils from "./utils.js";

/**
 * Expense()
 * The Expense class represents an expense made by a user. 
 * 
 * Author: Collin Tyler
 * 
 * The class has four attributes:
 * {string} type: the type of expense (i.e. "food", "entertainment")
 * {number} amount: the amount of the expense (must be >= 0)
 * {Date} date: the date that the expense occurred
 * {Date} createdDate: the date that the Expense was entered into the app
 * 
 * The constructor takes three arguments:
 *  ~type
 *  ~amount
 *  ~date
 * The createdDate attribute is also initialized by the constructor.
 * 
 * Throws:
 * TypeError,  if any of the constructor arguments are invalid
 */
export class Expense{

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
     * @param {*} type a string representing a category for the expense
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
 * Return the most recent chronological expense stored by the user.
 * @param {string} userId the unique ID of the user
 * @returns 
 */
export function getMostRecentExpense(userId){
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
 * Add an expense to the database
 *
 * @param {Object} expense - The expense data to be added.
 */
export function addExpense(expense) {
    null;
}

/**
 * Delete an expense by ID from the database.
 *
 * @param {number} expenseId - The ID of the expense to be deleted.
 * @param {Array} expenses - The array of expenses from which the expense will be deleted.
 * @returns {boolean} Returns true if the expense was deleted, false if the ID was not found.
 */
export function deleteExpense(expenseId, expenses) {
    const indexToDelete = expenses.findIndex(expense => expense.id === expenseId);
    if (indexToDelete !== -1) {
      const deletedExpense = expenses.splice(indexToDelete, 1)[0];
      return true;
    } else {
      return false;
    }
}