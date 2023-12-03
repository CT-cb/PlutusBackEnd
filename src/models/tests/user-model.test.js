require('jest');
const UserModel = require('../user-model');
const mongoose = require('mongoose');
describe("constructor tests", () => {
    let validEmail = "planwithplutus@gmail.com"
    let invalidEmail = "planwithplutus";

    let validPassword = "abc123";

    test('invalid email returns in an error',async ()=>{
        let mod = new UserModel({
            email: invalidEmail,
            password: validPassword,
            firstName: "Will",
            lastName: "Robinson"
        });

        let error = null;
        try{
            await UserModel.validate(mod);
        } catch (err) {
            error = err;
        }
        
        expect(error).not.toBe(null);
    });

    test('valid email does not throw an error in validate()',async ()=>{
        let mod = new UserModel({
            email: validEmail,
            password: validPassword
        });

        let error = null;
        try{
            await UserModel.validate(mod);
        } catch (err) {
            error = err;
        }
        
        expect(error).toBe(null);
    });
});