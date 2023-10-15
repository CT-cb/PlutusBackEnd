import {Expense, getAllExpenses, getExpensesCount, getEarliestExpense, getAllIncome} from "./expense.js";

/**
 *  Expense object constructor tests
 */ 

// Null argument tests
test("Initializing an Expense with null arguments creates an error", () =>{
    expect(new Expense(null,null,null)).toThrowError();
});

test("Initializing an Expense with null type and amount creates an error", () =>{
    expect(new Expense(null,null,new Date())).toThrowError();
});

test("Initializing an Expense with null type and amount creates an error", () =>{
    expect(new Expense(null,80.34,new Date())).toThrowError();
});

test("Initializing an Expense with null amount and date throws an error", () =>{
    expect(new Expense("food",null,null)).toThrowError();
});

test("Initializing an Expense with null amount throws an error", () =>{
    expect(new Expense("food",null, new Date())).toThrowError();
});

test("Initializing an Expense with null date throws an error", () =>{
    expect(new Expense("food",80.34,null)).toThrowError();
});


// Invalid argument tests

test("Initializing an Expense with an invalid type throws an error", () =>{
    expect(new Expense(1,80.34,new Date())).toThrowError();
});

test("Initializing an Expense with a non-number amount throws an error", () =>{
    expect(new Expense("food","80.34",new Date())).toThrowError();
});

test("Initializing an Expense with an invalid Date object throws an error", () =>{
    expect(new Expense("food",80.34,"September 29th")).toThrowError();
});

