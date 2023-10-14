import { getAllExpenses, calculateDailyMax } from "./expense";
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

test("Calling getAllExpenses with null startDate and null endDate returns a collection with length equal to the amount of all expenses stored by the user"), () => {
    expect(allExpenses).toHaveLength(getExpensesCount(userId));
}

test("Calling getAllExpenses with null startDate and null endDate returns a collection whose earliest item is the same as the output of getEarliestExpense"), () => {
    expect(allExpenses[0].date).toEqual(getEarliestExpense(userId))
}

test("Calling calculate daily max for 7 days with $700"), () => {
    //Need to set up a fake user with 700 total
    let daysToAdd = 7;
    let currentDate = new Date();
    let weekLater = currentDate.setDate(currentDate.getDate() + daysToAdd); 
    let dailyMax = calculateDailyMax(userId, weekLater);
    expect(dailyMax).toEqual(100);
}