export{
    isString,
    isNumber,
    isValidAmount,
    isValidDate,
    TimeDivisions,
    resolveTimeDivision,
    generateUuid
}

/**
 * Enum-like object containing valid time divisions for use by the API.
 * For instance, Limit objects use this to determine the period 
 * for which a spending limit should be exceeded.
 * 
 * Author: Collin Tyler
 */
const TimeDivisions = {
    YEARLY: 'yearly',
    MONTHLY: 'monthly',
    WEEKLY: 'weekly',
    DAILY: 'daily',
    INVALID: 'invalid'
}

/**
 * Match a string argument to a value in the TimeDivisions object.
 * 
 * Author: Collin Tyler
 * @param {string} strTimeDivision 
 * @returns a value from the TimeDivisions object, or TimeDivisions.INVALID if 
 * strTimeDivision doesn't match up to any of the other TimeDivision values.
 */
const resolveTimeDivision = function(strTimeDivision){
    if (strTimeDivision == null)
        return TimeDivisions.INVALID;

    if (!isString(strTimeDivision))
        return TimeDivisions.INVALID;

    switch (strTimeDivision){
        case 'yearly':
        case 'year':
        case 'annual':
        case 'annually':
            return TimeDivisions.YEARLY;
            
        case 'monthly':
        case 'month':
            return TimeDivisions.MONTHLY;
        
        case 'weekly':
        case 'week':
            return TimeDivision.WEEKLY;

        case 'daily':
        case 'day':
            return TimeDivisions.DAILY;

        default:
            return TimeDivisions.INVALID;
    }
}


/**
 * Determine whether the input argument is a string.
 * 
 * Author: Collin Tyler
 * @param {string} assumed_string 
 * @returns true if assumed_string is a string, false if assumed_string
 * is null or a different data type
 */
const isString = function(assumed_string){
    if (assumed_string == null) return false;
    return typeof(assumed_string) == typeof(String());
}

/**
 * Determine whether the input argument is a number.
 * 
 * Author: Collin Tyler
 * @param {number} assumed_number 
 * @returns true if assumed_number is an integer or floating point number, 
 * false if assumed_number is null or another data type
 */
const isNumber = function(assumed_number){
    if (assumed_number == null) return false;
    return Number.isInteger(assumed_number);
}

/**
 * Determine whether the input argument is a Date() object.
 * 
 * Author: Collin Tyler
 * @param {Date} assumed_date 
 * @returns true if assumed_date is an object of the Date class,
 * false if assumed_date is null or is another data type.
 */
const isDate = function(assumed_date){
    if (assumed_date == null) return false;
    return Object.getPrototypeOf(assumed_date) == Date.prototype;
}

/**
 * Determine if an input argument is a non-negative number.
 * 
 * Author: Collin Tyler
 * @param {number} amount an int or floating point representing a non-negative dollar amount
 * @returns true if amount is a non-zero number, false if otherwise
 */
export const isValidAmount = function(amount){
    if (!utils.isNumber(amount))
        return false;

    return amount >= 0;
}

/**
 * Determine if the input argument is an object of the Date class with valid
 * year, month, and day values.
 * 
 * Author: Collin Tyler
 * @param {Date} date a Date() object
 * @returns true if date is a Date() object and has a valid date, 
 * false if date is null, not a Date() object, or has an invalid year, month, or date
 */
export const isValidDate = function(date){
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

/**
 * Generate a string uuid that does not already exist in the database.
 * @returns 
 */
export const generateUuid = function(){
    return null;
}