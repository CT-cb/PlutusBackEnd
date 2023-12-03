require('jest');
const IncomeModel = require('../income-model');
const mongoose = require('mongoose');
describe("constructor tests", () => {
    let validEmail = "planwithplutus@gmail.com"
    let invalidEmail = "planwithplutus";

    let validAmount = 50;
    let invalidAmount = "car";

    test('invalid email returns in an error',async ()=>{
        let mod = new IncomeModel({
            email: invalidEmail,
            amount: validAmount,
            currency: "usd",
            type: "direct_deposit",
            incomeDate: "2023-11-30"
        });

        let error = null;
        try{
            await IncomeModel.validate(mod);
        } catch (err) {
            error = err;
        }
        
        expect(error).not.toBe(null);
    });

    test('valid email does not throw an error in validate()',async ()=>{
        let mod = new IncomeModel({
            email: validEmail,
            amount: validAmount,
            currency: "usd",
            type: "direct_deposit",
            incomeDate: "2023-11-30"
        });

        let error = null;
        try{
            await IncomeModel.validate(mod);
        } catch (err) {
            error = err;
        }
        
        expect(error).toBe(null);
    });
    
})