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

// Mocking the database functions for testing
let database = [];
const mockDatabaseAdd = (expenseData) => {
  database.push(expenseData);
};
const expenseData = { type: 'food', amount: 50.00, date: new Date() };
test('adds a valid expense to the database', () => {
    // Create an instance of the Expense class
    const expense = new Expense('food', 50.00, new Date());
    expense.addExpense = mockDatabaseAdd;
    expense.addExpense(expenseData);
    // Check if the expense was added to the database
    expect(database).toHaveLength(1);
    expect(database[0]).toEqual(expect.objectContaining(expenseData));
  });


