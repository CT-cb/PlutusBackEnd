const LimitHelpers = require("../limit-helpers");

describe("tests for hasCorrectParameters",()=>{
    let payloadNoDates = {
        email: "planwithplutus@gmail.com",
        timeDivision:"week",
        maxLimit:250
    }

    let objMissingEmail = {
        timeDivision: "week",
        maxLimit:500
    };
    test('null obj returns false',()=>{
        expect(LimitHelpers.hasCorrectAttributes(null)).toBe(false);
    });

    test("if obj isn't an object, return false",()=>{
        expect(LimitHelpers.hasCorrectAttributes(35)).toBe(false);
    });

    test("If an attrib is missing, return false",()=>{
        expect(LimitHelpers.hasCorrectAttributes(objMissingEmail)).toBe(false);
    });
    
    test("obj w/ no dates should return true",()=>{
        const result = LimitHelpers.hasCorrectAttributes(payloadNoDates);
        expect(result).toBe(true);
    });

    
});