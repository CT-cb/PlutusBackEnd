/**
 * Unit tests for global-helpers.js functions
 */
const GlobalHelpers = require('../global-helpers');

describe('tests for hasParams(list) function', () => {
    let exampleParams = [
        "email",
        "type",
        "startDate",
        "endDate"
    ];

    let nullParams = null;

    let correctObject = {
        email: "planwithplutus@gmail.com",
        type: "shopping",
        startDate: Date.now(),
        endDate: Date.now()
    }

    let incorrectObject = {
        email: "planwithplutus@gmail.com",
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

    test('passing a string into params returns false', () => {
        let a = GlobalHelpers.hasParams(correctObject, "email");
        expect(a).toBe(false);
    });

    test('passing a number into obj returns false', () => {
        let a = GlobalHelpers.hasParams(65, exampleParams);
        expect(a).toBe(false);
    })

    test('obj with missing param(s) returns false', () => {
        let a = GlobalHelpers.hasParams(incorrectObject, exampleParams);
        expect(a).toBe(false);
    });

    test('obj with all param(s) returns true', () => {
        let a = GlobalHelpers.hasParams(correctObject, exampleParams);
        expect(a).toBe(true);
    })
});

describe('tests for fixStartDateDefaultPresent', () => {
    let objWithUndefinedStartDate = {
        email: "planwithplutus@gmail.com",
        endDate: "2023-11-30"
    };

    let objWithNullStartDate = {
        email: "planwithplutus@gmail.com",
        startDate: null,
        endDate: "2023-11-30"
    };

    let objWithStartDateBelowMinDate = {
        email: "planwithplutus@gmail.com",
        startDate: "1700-01-01",
        endDate: "2023-11-30"
    };

    let objWithStartDateAboveMaxDate = {
        email: "planwithplutus@gmail.com",
        startDate: "4000-01-01",
        endDate: "4001-01-01"
    };

    let objWithNonDateStartDate = {
        email: "planwithplutus@gmail.com",
        startDate: "no!!",
        endDate: "2023-11-30"
    };

    let objWithValidStartDateYearOnly = {
        email: "planwithplutus@gmail.com",
        startDate: "1923",
        endDate: "2023-11-30"
    };

    let objWithValidStartDateYearMonthOnly = {
        email: "planwithplutus@gmail.com",
        startDate: "1923-01",
        endDate: "2023-11-30"
    }

    let objWithValidStartDateYearMonthDay = {
        email: "planwithplutus@gmail.com",
        startDate: "1932-01-01",
        endDate: "2023-11-30"
    }

    it('should be set to current date if startDate is undefined', () => {
        let obj = objWithUndefinedStartDate;
        GlobalHelpers.fixDateDefaultToPresent(obj);

        expect(obj).toBeDefined();
        expect(obj).not.toBeNull();

        let c = new Date();
        let d = new Date(obj.startDate);

        expect(isNaN(d)).toBe(false);

        expect(d.getFullYear() == c.getFullYear()).toBe(true);
        expect(d.getMonth() == c.getMonth()).toBe(true);
        expect(d.getDate() == c.getDate()).toBe(true);
    });

    it('should be set to current date if startDate is null', () => {
        let obj = objWithNullStartDate;

        GlobalHelpers.fixDateDefaultToPresent(obj);

        expect(obj.startDate).toBeDefined();
        expect(obj.startDate).not.toBeNull();

        let c = new Date();
        let d = new Date(obj.startDate);

        expect(isNaN(d)).toBe(false);

        expect(d.getFullYear() == c.getFullYear()).toBe(true);
        expect(d.getMonth() == c.getMonth()).toBe(true);
        expect(d.getDate() == c.getDate()).toBe(true);
    });

    it('should be set to current date if startDate is not a valid date', () => {
        let obj = objWithNonDateStartDate;

        GlobalHelpers.fixDateDefaultToPresent(obj);

        expect(obj.startDate).toBeDefined();
        expect(obj.startDate).not.toBeNull();

        let c = new Date();
        let d = new Date(obj.startDate);

        expect(isNaN(d)).toBe(false);

        expect(d.getFullYear() == c.getFullYear()).toBe(true);
        expect(d.getMonth() == c.getMonth()).toBe(true);
        expect(d.getDate() == c.getDate()).toBe(true);
    });

    it('should be set to MIN_DATE if startDate is before MIN_DATE', () => {
        let obj = objWithStartDateBelowMinDate;

        GlobalHelpers.fixDateDefaultToPresent(obj);

        expect(obj.startDate).toBeDefined();
        expect(obj.startDate).not.toBeNull();


        let d = new Date(obj.startDate);

        expect(isNaN(d)).toBe(false);



        expect(d.getFullYear() == GlobalHelpers.MIN_YEAR).toBe(true);
    });

    it('should be set to MAX_DATE if startDate is after MAX_DATE', () => {
        let obj = objWithStartDateAboveMaxDate;

        GlobalHelpers.fixDateDefaultToPresent(obj);

        expect(obj.startDate).toBeDefined();
        expect(obj.startDate.startDate).not.toBeNull();


        let d = new Date(obj.startDate);

        expect(isNaN(d)).toBe(false);



        expect(d.getFullYear() == GlobalHelpers.MAX_YEAR).toBe(true);
    });
});

describe('tests for fixStartDateDefaultDateMinDate', () => {
    let objWithUndefinedStartDate = {
        email: "planwithplutus@gmail.com",
        endDate: "2023-11-30"
    };

    let objWithNullStartDate = {
        email: "planwithplutus@gmail.com",
        startDate: null,
        endDate: "2023-11-30"
    };

    let objWithStartDateBelowMinDate = {
        email: "planwithplutus@gmail.com",
        startDate: "1700-01-01",
        endDate: "2023-11-30"
    };

    let objWithStartDateAboveMaxDate = {
        email: "planwithplutus@gmail.com",
        startDate: "4000-01-01",
        endDate: "4001-01-01"
    };

    let objWithNonDateStartDate = {
        email: "planwithplutus@gmail.com",
        startDate: "no!!",
        endDate: "2023-11-30"
    };

    let objWithValidStartDateYearOnly = {
        email: "planwithplutus@gmail.com",
        startDate: "1923",
        endDate: "2023-11-30"
    };

    let objWithValidStartDateYearMonthOnly = {
        email: "planwithplutus@gmail.com",
        startDate: "1923-01",
        endDate: "2023-11-30"
    }

    let objWithValidStartDateYearMonthDay = {
        email: "planwithplutus@gmail.com",
        startDate: "1932-01-01",
        endDate: "2023-11-30"
    }

    it('should equal MIN_DATE if startDate is undefined', () => {
        let obj = objWithUndefinedStartDate;

        GlobalHelpers.fixStartDateDefaultMinDate(obj);

        expect(obj.startDate).toBeDefined();
        expect(obj.startDate).not.toBeNull();

        let d = new Date(obj.startDate);

        expect(isNaN(d)).toBe(false);



        expect(obj.startDate).toBe(GlobalHelpers.MIN_DATE);
        expect(d.getFullYear() == GlobalHelpers.MIN_YEAR).toBe(true);
    });

    it('should equal MIN_DATE if startDate is null', () => {
        let obj = objWithNullStartDate;

        GlobalHelpers.fixStartDateDefaultMinDate(obj);

        expect(obj.startDate).toBeDefined();
        expect(obj.startDate).not.toBeNull();

        let d = new Date(obj.startDate);

        expect(isNaN(d)).toBe(false);

        expect(obj.startDate).toBe(GlobalHelpers.MIN_DATE);
        expect(d.getFullYear() == GlobalHelpers.MIN_YEAR).toBe(true);
    });

    it('should equal MIN_DATE if startDate is not a valid date', () => {
        let obj = objWithNonDateStartDate;

        GlobalHelpers.fixStartDateDefaultMinDate(obj);

        expect(obj.startDate).toBeDefined();
        expect(obj.startDate).not.toBeNull();

        let d = new Date(obj.startDate);

        expect(isNaN(d)).toBe(false);

        expect(obj.startDate).toBe(GlobalHelpers.MIN_DATE);
        expect(d.getFullYear() == GlobalHelpers.MIN_YEAR).toBe(true);
    });

    it('should equal MIN_DATE if startDate is before MIN_DATE', () => {
        let obj = objWithStartDateBelowMinDate;

        GlobalHelpers.fixStartDateDefaultMinDate(obj);

        expect(obj.startDate).toBeDefined();
        expect(obj.startDate).not.toBeNull();

        let d = new Date(obj.startDate);

        expect(isNaN(d)).toBe(false);

        expect(obj.startDate).toBe(GlobalHelpers.MIN_DATE);
        expect(d.getFullYear() == GlobalHelpers.MIN_YEAR).toBe(true);
    });

    it('should equal MAX_DATE if startDate is after MAX_DATE', () => {
        let obj = objWithStartDateAboveMaxDate;

        GlobalHelpers.fixStartDateDefaultMinDate(obj);

        expect(obj.startDate).toBeDefined();
        expect(obj.startDate).not.toBeNull();

        let d = new Date(obj.startDate);

        expect(isNaN(d)).toBe(false);

        expect(obj.startDate).toBe(GlobalHelpers.MAX_DATE);
        expect(d.getFullYear() == GlobalHelpers.MAX_YEAR).toBe(true);
    });

});

describe('tests for fixEndDateDefaultDateMinDate', () => {
    let objWithUndefinedEndDate = {
        email: "planwithplutus@gmail.com",
        startDate: "2023-11-30"
    };

    let objWithNullEndDate = {
        email: "planwithplutus@gmail.com",
        endDate: null,
        startDate: "2023-11-30"
    };

    let objWithEndDateBelowMinDate = {
        email: "planwithplutus@gmail.com",
        endDate: "1700-01-01",
        endDate: "1702-11-30"
    };

    let objWithEndDateAboveMaxDate = {
        email: "planwithplutus@gmail.com",
        startDate: "4000-01-01",
        endDate: "4001-01-01"
    };

    let objWithNonDateEndDate = {
        email: "planwithplutus@gmail.com",
        endDate: "no!!",
        startDate: "2023-11-30"
    };

    let objWithValidEndDateYearOnly = {
        email: "planwithplutus@gmail.com",
        endDate: "1923",
        startDate: "2023-11-30"
    };

    let objWithValidEndDateYearMonthOnly = {
        email: "planwithplutus@gmail.com",
        endDate: "1923-01",
        startDate: "2023-11-30"
    }

    let objWithValidEndDateYearMonthDay = {
        email: "planwithplutus@gmail.com",
        endDate: "1932-01-01",
        startDate: "2023-11-30"
    }

    it('should equal MAX_DATE if endDate is undefined', () => {
        let obj = objWithUndefinedEndDate;

        GlobalHelpers.fixEndDateDefaultMaxDate(obj);

        expect(obj.endDate).toBeDefined();
        expect(obj.endDate).not.toBeNull();

        let d = new Date(obj.endDate);

        expect(isNaN(d)).toBe(false);

        expect(obj.endDate).toBe(GlobalHelpers.MAX_DATE);
        expect(d.getFullYear() == GlobalHelpers.MAX_YEAR).toBe(true);
    });

    it('should equal MAX_DATE if endDate is null', () => {
        let obj = objWithNullEndDate;

        GlobalHelpers.fixEndDateDefaultMaxDate(obj);

        expect(obj.endDate).toBeDefined();
        expect(obj.endDate).not.toBeNull();

        let d = new Date(obj.endDate);

        expect(isNaN(d)).toBe(false);

        expect(obj.endDate).toBe(GlobalHelpers.MAX_DATE);
        expect(d.getFullYear() == GlobalHelpers.MAX_YEAR).toBe(true);
    });

    it('should equal MAX_DATE if endDate is not a valid date', () => {
        let obj = objWithNonDateEndDate;

        GlobalHelpers.fixEndDateDefaultMaxDate(obj);

        expect(obj.endDate).toBeDefined();
        expect(obj.endDate).not.toBeNull();

        let d = new Date(obj.endDate);

        expect(isNaN(d)).toBe(false);

        expect(obj.endDate).toBe(GlobalHelpers.MAX_DATE);
        expect(d.getFullYear() == GlobalHelpers.MAX_YEAR).toBe(true);
    });

    it('should equal MIN_DATE if endDate is before MIN_DATE', () => {
        let obj = objWithEndDateBelowMinDate;

        GlobalHelpers.fixEndDateDefaultMaxDate(obj);

        expect(obj.endDate).toBeDefined();
        expect(obj.endDate).not.toBeNull();

        let d = new Date(obj.endDate);

        expect(isNaN(d)).toBe(false);

        expect(obj.endDate).toBe(GlobalHelpers.MIN_DATE);
        expect(d.getFullYear() == GlobalHelpers.MIN_YEAR).toBe(true);
    });

    it('should equal MAX_DATE if endDate is after MAX_DATE', () => {
        let obj = objWithEndDateAboveMaxDate;

        GlobalHelpers.fixEndDateDefaultMaxDate(obj);

        expect(obj.endDate).toBeDefined();
        expect(obj.endDate).not.toBeNull();

        let d = new Date(obj.endDate);

        expect(isNaN(d)).toBe(false);

        expect(obj.endDate).toBe(GlobalHelpers.MAX_DATE);
        expect(d.getFullYear() == GlobalHelpers.MAX_YEAR).toBe(true);
    });

});

describe('tests for fixAmountBounds', () => {

    let objWithLowerBoundUndefined = {
        amountUpperBound: 500
    };

    let objWithLowerBoundNull = {
        amountLowerBound: null,
        amountUpperBound: 100
    };

    let objWithUppeBoundUndefined = {
        amountLowerBound: 10
    };
    let objWithLowerBoundNegative = {
        amountLowerBound: -10,
        amountUpperBound: 15
    };


});