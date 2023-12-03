require('jest');
const ExpenseModel = require('../expense-model');
const mongoose = require('mongoose');
describe("constructor tests", () => {
    let validEmail = "planwithplutus@gmail.com"
    let invalidEmail = "planwithplutus";

    let validAmount = 50;
    let invalidAmount = "car";

    test('invalid email returns in an error',async ()=>{
        let mod = new ExpenseModel({
            email: invalidEmail,
            amount: validAmount,
            currency: "usd",
            method: "credit_card",
            expenseDate: "2023-11-30"
        });

        let error = null;
        try{
            await ExpenseModel.validate(mod);
        } catch (err) {
            error = err;
        }
        
        expect(error).not.toBe(null);
    });

    test('valid email does not throw an error in validate()',async ()=>{
        let mod = new ExpenseModel({
            email: validEmail,
            amount: validAmount,
            currency: "usd",
            method: "credit_card",
            expenseDate: "2023-11-30"
        });

        let error = null;
        try{
            await ExpenseModel.validate(mod);
        } catch (err) {
            error = err;
        }
        
        expect(error).toBe(null);
    });
    

})