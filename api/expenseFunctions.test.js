import { getAllExpenses, getEarliestExpense, ge, getMostRecentExpense } from "./expense";
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




