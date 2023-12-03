/**
 * Unit tests for expense-helpers.js functions
 */
require('jest');
const ExpenseHelpers = require('../expense-helpers');
const mongoose = require('mongoose');
afterAll(async()=>{
    await mongoose.disconnect();
});
describe('tests for hasCorrectAttributes',()=>{
    let correctObj = {
        "email":"planwithplutus@gmail.com",
        "method":"credit_card",
        "amount":19.99,
        "expenseDate":Date.now(),
        "currency":"usd",
        "payee":{
            "name":"example payee",
            "description":"A service that provides examples for unit tests.",
            "category":"miscellaneous"
        }
    }

    let incorrectObj1 = {
        "email":"planwithplutus@gmail.com",
        "method":"debit_card",
        "expenseDate":Date.now(),
        "payee":{
            "name":"Bob",
            "description":"my buddy",
            "category":"misc"
        }
    }

    test('null obj returns false',()=>{
        expect(ExpenseHelpers.hasCorrectAttributes(null)).toBe(false);
    });

    test("if obj isn't an object, return false",()=>{
        expect(ExpenseHelpers.hasCorrectAttributes(35)).toBe(false);
    });

    test("if an attrib is missing, return false",()=>{
        expect(ExpenseHelpers.hasCorrectAttributes(incorrectObj1)).toBe(false);
    });

    test("if all attribs are present, returns true",()=>{
        expect(ExpenseHelpers.hasCorrectAttributes(correctObj)).toBe(true);
    });
});