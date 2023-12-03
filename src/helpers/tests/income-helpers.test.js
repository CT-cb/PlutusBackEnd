/**
 * Unit tests for income-helpers.js functions
 */
require('jest');
const IncomeHelpers = require('../income-helpers');

describe('tests for hasCorrectAttributes',()=>{
    let correctObj = {
        "email":"planwithplutus@gmail.com",
        "type":"direct_deposit",
        "amount":19.99,
        "incomeDate":Date.now(),
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
        "incomeDate":Date.now(),
        "payee":{
            "name":"Bob",
            "description":"my buddy",
            "category":"misc"
        }
    }

    test('null obj returns false',()=>{
        expect(IncomeHelpers.hasCorrectAttributes(null)).toBe(false);
    });

    test("if obj isn't an object, return false",()=>{
        expect(IncomeHelpers.hasCorrectAttributes(35)).toBe(false);
    });

    test("if an attrib is missing, return false",()=>{
        expect(IncomeHelpers.hasCorrectAttributes(incorrectObj1)).toBe(false);
    });

    test("if all attribs are present, returns true",()=>{
        expect(IncomeHelpers.hasCorrectAttributes(correctObj)).toBe(true);
    });
});