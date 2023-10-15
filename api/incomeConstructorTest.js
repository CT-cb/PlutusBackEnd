import { Income } from "./income.js";

describe("Income Class and Methods", () => {
  // Test isValidType method
  describe("isValidType", () => {
    test("Valid type is accepted", () => {
      expect(Income.isValidType("Income")).toBe(true);
    });

    test("Empty type is not valid", () => {
      expect(Income.isValidType("")).toBe(false);
    });

    test("Non-string type is not valid", () => {
      expect(Income.isValidType(123)).toBe(false);
    });
  });

  // Test isValidAmount method
  describe("isValidAmount", () => {
    test("Valid amount is accepted", () => {
      expect(Income.isValidAmount(100.50)).toBe(true);
    });

    test("Negative amount is not valid", () => {
      expect(Income.isValidAmount(-50)).toBe(false);
    });

    test("Zero amount is not valid", () => {
      expect(Income.isValidAmount(0)).toBe(false);
    });

    test("Non-number amount is not valid", () => {
      expect(Income.isValidAmount("Income")).toBe(false);
    });
  });

  // Test isValidDate method
  describe("isValidDate", () => {
    test("Valid date is accepted", () => {
      const validDate = new Date();
      expect(Income.isValidDate(validDate)).toBe(true);
    });

    test("Invalid date is not valid", () => {
      const invalidDate = "2023-09-29"; 
      expect(Income.isValidDate(invalidDate)).toBe(false);
    });

    test("Date with invalid year is not valid", () => {
      const invalidDate = new Date("invalid");
      expect(Income.isValidDate(invalidDate)).toBe(false);
    });

    test("Date with invalid month is not valid", () => {
      const invalidDate = new Date(2023, 15, 1); // checks month 15
      expect(Income.isValidDate(invalidDate)).toBe(false);
    });

    test("Date with invalid day is not valid", () => {
      const invalidDate = new Date(2023, 8, 35); // checks day 35 of month
      expect(Income.isValidDate(invalidDate)).toBe(false);
    });
  });

  // Income class constructor tests
  describe("Income Constructor", () => {
    test("Valid Income object is created", () => {
      const validDate = new Date();
      const income = new Income("Income", 100.50, validDate);
      expect(income.type).toBe("Income");
      expect(income.amount).toBe(100.50);
      expect(income.date).toEqual(validDate);
    });

    test("Invalid Income object creation throws errors", () => {
      // Test with invalid values that should throw errors
      expect(() => new Income("", -50, "InvalidDate")).toThrow();
    });
  });

  describe("getAllIncome", () => {
      test("get all income with all valid arguments",()=>{
          const userID = "user1";
          const startDate = new Date();
          const endDate = new Date(); //should insert date for these two?

          const result = getAllIncome(userId,startDate,endDate);

          expect(typeof userID).toBe("string");
          expect(startDate instanceof Date).toBe(true);
          expect(endDate instanceof Date).toBe(true);

      });
    test("Get all income with no date range", () => {
      const userId = "user1";
      const result = getAllIncome(userId);

      expect(startDate(userID,null,"Bad Date")).toThrowError();
    });
  });
    
  describe("getIncomeCount", () => {
      test("get income count from a user",()=>{
          const userID = "user1";
          const count = getIncomeCount(userId);

          expect(typeof count).toBe("number");
          expect(count>=0).toBe(true);

      });
    test("Get income for user with no income", () => {
      const userId = "user1";
      const result = getAllIncome(userId);


      expect(count).toBe(0);
    });
  });
    
describe("getEarliestIncome Function - Invalid Input", () => {
  test("Throws an error if user ID is null", () => {
    const userId = null;

    expect(() => getEarliestIncome(userId)).toThrowError(TypeError);
      });

  test("Throws an error if user ID is not a string", () => {
    const userId = 123; 

    expect(() => getEarliestIncome(userId)).toThrowError(TypeError);
      });
    test("Throws an error if the date is invalid",()=>{
        const startDate = null;
     expect(() => getEarliestIncome(startDate)).toThrowError(TypeError);
    });
});
