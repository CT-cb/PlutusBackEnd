require('jest');

let AuthHelpers = require('../auth-helpers');
const mongoose = require('mongoose');
let goodObj = null;
let badObjMissingEmail = null;
let badObjMissingPassword = null;

beforeAll(() => {
    goodObj = {
        email:"example@example.com",
        password:"ABC123456789"
    }

    badObjMissingEmail = {
        password: "abc123"
    }

    badObjMissingPassword = {
        email: "test@test.com"
    }

});

afterAll(async()=>{
    await mongoose.disconnect();
});

describe("test hasLoginKeys() function",()=>{

    test("null obj returns false",()=>{
        expect(AuthHelpers.hasLoginKeys(null)).toBe(false);
    });

    test("return true for goodObj",()=>{
        let a = AuthHelpers.hasLoginKeys(goodObj);
        expect(a).toBe(true);
    });
    
    test("return false for badObjMissingEmail",()=>{
        let b = AuthHelpers.hasLoginKeys(badObjMissingEmail);
        expect(b).toBe(false);
    });

    test("return false for badObjMissingPassword",()=>{
        let c = AuthHelpers.hasLoginKeys(badObjMissingPassword);
        expect(c).toBe(false);
    });
});