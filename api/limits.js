import * as utils from "./utils";

/**
 * The Limit class represents a spending limit imposed by a user.
 * The Limit may optionally have an expiration date. A null expiration date means the limit will never expire.
 * 
 * The class has four attributes:
 * {number} amount: the amount of the limit (must be >= 0)
 * {string} timeDivision: the time division associated with the limit (i.e. "weekly","monthly")
 * {Date} expirationDate (optional): the date on which the limit will expire. If null, the limit will not expire.
 * {Date} createdDate: the date that the limit was entered into the app
 * 
 * The constructor takes two arguments and one optional argument:
 *  ~amount
 *  ~timeDivision
 *  ~expirationDate (optional)
 * The createdDate attribute is also initialized by the constructor.
 * 
 * Author: Collin Tyler
 */
class Limit {

    createdDate;
    amount;
    timeDivision;
    expirationDate;

    constructor(amount,timeDivision,expirationDate = null){
        
        if (expirationDate){
            if (!utils.isValidDate(expirationDate))
                throw new Error("Date was invalid.");
            this.expirationDate = expirationDate;
        }

        if (!utils.isValidAmount(amount))
            throw new TypeError("Amount was invalid.");

        this.amount = amount;
        this.timeDivision = utils.resolveTimeDivision(timeDivision);
        this.createdDate = Date.now();
    }
}


/**
 * Get the monthly limit for a user
 * 
 * @param {string} userId the unique ID of the user
 * @returns a float number that shows what the monthly limit for the user is
 */
export function getMonthlyLimit(userId){
    //import income class data
    return null;
}

/**
 * Calculate how much a user can spend daily until the specified End date
 * 
 * @param {string} userID 
 * @param {Date} endDate 
 * @returns how much the user can spend daily until endDate
 */
export function calculateDailyMax(userID, endDate)
{
    return null;
}
