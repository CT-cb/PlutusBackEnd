/**
 * Unit tests for global-helpers.js functions
 */

const GlobalHelpers = require('../global-helpers');

describe('tests for hasParams(list) function', () => {
    let exampleParams = [
        "userId",
        "type",
        "startDate",
        "endDate"
    ];

    let nullParams = null;

    let correctObject = {
        userId: "planwithplutus@gmail.com",
        type: "shopping",
        startDate: Date.now(),
        endDate: Date.now()
    }

    let incorrectObject = {
        userId: "planwithplutus@gmail.com",
        type: "shopping",
        startDate: Date.now()
    }

    let nullObject = null;

    test('null params list returns false', () => {
        let a = GlobalHelpers.hasParams(correctObject, null);
        expect(a).toBe(false);
    });

    test('null obj returns false', () => {
        let a = GlobalHelpers.hasParams(null, exampleParams);
        expect(a).toBe(false);
    });

    test('null obj and null params returns false', () => {
        let a = GlobalHelpers.hasParams(null, null);
        expect(a).toBe(false);
    });

    test('passing a string into params returns false',()=>{
        let a = GlobalHelpers.hasParams(correctObject,"userId");
        expect(a).toBe(false);
    });

    test('passing a number into obj returns false',()=>{
        let a = GlobalHelpers.hasParams(65,exampleParams);
        expect(a).toBe(false);
    })

    test('obj with missing param(s) returns false', () => {
        let a = GlobalHelpers.hasParams(incorrectObject,exampleParams);
        expect(a).toBe(false);
    });

    test('obj with all param(s) returns true',()=>{
        let a = GlobalHelpers.hasParams(correctObject,exampleParams);
        expect(a).toBe(true);
    })
});