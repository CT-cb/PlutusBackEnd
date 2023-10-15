import {Income, getAllIncome, getIncomeCount, getEarliestIncome} from "./income.js";

/**
 *  Expense object constructor tests
 */ 

// Null argument tests
test("Initializing an Income with null arguments throws an error", () =>{
    expect(new Income(null, null, null)).toThrowError();
});
test("Initializing an Income with null type and amount throws an error", () =>{
    expect(new Income(null,null,new Date())).toThrowError();
});

test("Initializing an Income with null type and amount throws an error", () =>{
    expect(new Income(null,20.23,new Date())).toThrowError();
});

test("Initializing an Income with null amount and date throws an error", () =>{
    expect(new Income("user1",null,null)).toThrowError();
});

test("Initializing an Income with null amount throws an error", () =>{
    expect(new Income("user1",null, new Date())).toThrowError();
});

test("Initializing an Income with null date throws an error", () =>{
    expect(new Income("user1",20.23,null)).toThrowError();
});

// Invalid argument tests

test("Initializing an Income with an invalid type throws an error", () =>{
    expect(new Income(2983,20.23,new Date())).toThrowError();
});

test("Initializing an Income with a non-number amount throws an error", () =>{
    expect(new Income("user1","20.23",new Date())).toThrowError();
});

test("Initializing an Income with an invalid Date object throws an error", () =>{
    expect(new Income("user1",20.23,"January 1")).toThrowError();
});
