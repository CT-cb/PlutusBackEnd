/**
 * Unit tests for expense-helpers.js functions
 */

const ExpenseHelpers = require('../expense-helpers');

describe('tests for hasCorrectAttributes',()=>{
    let correctObj = {
        "user":"planwithplutus@gmail.com",
        "method":"credit_card",
        "amount":19.99,
        "expenseDate":Date.now(),
        "payee":{
            "name":"example payee",
            "description":"A service that provides examples for unit tests.",
            "category":"miscellaneous"
        }
    }

    let incorrectObj1 = {
        "user":"planwithplutus@gmail.com",
        "method":"debit_card",
        "expenseDate":Date.now(),
        "payee":{
            "name":"Bob",
            "description":"my buddy",
            "category":"misc"
        }
    }

    
});