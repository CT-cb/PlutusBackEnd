const LimitHelpers = require("../limit-helpers");

describe("given a request to add a limit that has required parameters but no dates",()=>{
    let payload = {
        email: "planwithplutus@gmail.com",
        timeDivision:"week",
        maxLimit:250
    }
    test("hasCorrectParameters should return true",()=>{
        const result = LimitHelpers.hasCorrectAttributes(payload);
        expect(result).toBe(true);
    });

    
});