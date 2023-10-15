import { getAllExpenses, getEarliestExpense, getMostRecentExpense, calculateDailyMax, addExpense, deleteExpense } from "./expense";
/**
 * Function tests
 */

let userId = null;
let allExpenses = null;
// getAllExpenses tests

beforeEach(() => {
    userId = null;
    allExpenses = getAllExpenses(userId);
})

// null argument tests


test("Calling getAllExpenses with null startDate and null endDate returns a collection with length equal to the amount of all expenses stored by the user"), () => {
    expect(allExpenses).toHaveLength(getExpensesCount(userId));
}

test("Calling getAllExpenses with null startDate and null endDate returns a collection whose earliest item is the same as the output of getEarliestExpense"), () => {
    expect(allExpenses[0].date).toEqual(getEarliestExpense(userId).date)
}

test("Calling getAllExpenses with a null endDate returns a collection whose most recent expense is equal to the most recent expense returned by getMostRecentExpense."), () =>{
    expect(allExpenses[allExpenses.length-1].date).toEqual(getMostRecentExpense(userId).date)
}

test('should add an expense to the expenses array', () => {
    const expenses = [];
    const expenseData = { source: 'Groceries', amount: 50.00, date: '2023-10-13' };
    addExpense(expenseData, expenses);
 
    expect(expenses).toHaveLength(1); // The expenses array should contain one expense
    expect(expenses[0]).toEqual(expenseData); // The added expense should match the provided data
 });

 test('should delete an expense by ID and return true', () => {
    const expenses = [
      { id: 1, source: 'Groceries', amount: 50.00, date: '2023-10-13' },
      { id: 2, source: 'Utilities', amount: 100.00, date: '2023-10-15' },
     ];
     const result = deleteExpense(1, expenses);
     expect(result).toBeTruthy(); // Should return true
     expect(expenses).toHaveLength(1); // The expenses array should contain one remaining expense
     expect(expenses[0].id).toBe(2); // The remaining expense should have the ID 2
 });
 
 test('should return false for a non-existent ID and leave expenses unchanged', () => {
    const expenses = [
      { id: 1, source: 'Groceries', amount: 50.00, date: '2023-10-13' },
      { id: 2, source: 'Utilities', amount: 100.00, date: '2023-10-15' },
    ];
    const result = deleteExpense(3, expenses);
    expect(result).toBeFalsy(); // Should return false
    expect(expenses).toHaveLength(2); // The expenses array should remain unchanged
 });
