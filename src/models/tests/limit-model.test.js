require('jest');
const LimitModel = require('../limit-model');
const mongoose = require('mongoose');
describe("constructor tests", () => {
    let validEmail = "planwithplutus@gmail.com"
    let invalidEmail = "planwithplutus";

    let validAmount = 50;
    let invalidAmount = "car";

    let validTimeDiv = "week";
    let invalidTimeDiv = "century";

    test('invalid email returns in an error',async ()=>{
        let mod = new LimitModel({
            email: invalidEmail,
            maxLimit: validAmount,
            currency: "usd",
            timeDivision: validTimeDiv,
            startDate: "2023-11-30"
        });

        let error = null;
        try{
            await LimitModel.validate(mod);
        } catch (err) {
            error = err;
        }
        
        expect(error).not.toBe(null);
    });

    test('valid email does not throw an error in validate()',async ()=>{
        let mod = new LimitModel({
            email: validEmail,
            maxLimit: validAmount,
            currency: "usd",
            timeDivision: "week",
            startDate: "2023-11-30"
        });

        let error = null;
        try{
            await LimitModel.validate(mod);
        } catch (err) {
            error = err;
        }
        
        expect(error).toBe(null);
    });

    test('valid email with invalid timeDivision throws an error in validate()',async ()=>{
        let mod = new LimitModel({
            email: validEmail,
            maxLimit: validAmount,
            currency: "usd",
            timeDivision: invalidTimeDiv,
            startDate: "2023-11-30"
        });

        let error = null;
        try{
            await LimitModel.validate(mod);
        } catch (err) {
            error = err;
        }
        
        expect(error).not.toBe(null);
    });
    

})