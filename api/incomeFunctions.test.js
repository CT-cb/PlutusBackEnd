import { getAllIncome, getEarliestIncome, getIncomeCount } from "./income";
/** 
 * Function tests 
 */

let userId = null; 
let allIncome = null; 

beforeEach(() => {
    userId = null; 
    allIncome = getAllIncome(userId); 
})

test("Calling getAllIncome with null startDate and null endDate. Returns a collection with length equal to the amount of all income streams entered by the user"), () => {
    expect(allIncome).toHaveLength(getIncomeCount(userId));
}

test("Calling getAllIncome with null startDat and null endDate. Returns a collection with the earliest item being the same as the output as getEarliestIncome"), () => {
    expect(allIncome[0].date).toEqual(getEarliestIncome(userId).date);
}

test("Should add an income amount to the incomes array", () => {
    const incomes = []; 
    const incomeData = { source: 'Part-time Job', amount: 300.00, date: '2023-10-10'}; 
    addExpense(incomeData, incomes); 

    expect(incomes).toHaveLength(1); 
    expect(incomes[0]).toEqual(incomeData); 
});   

test("Should return false for a non-existent ID and leave incomes unchanged", () => {
    const incomes = [ 
    { id: 1, source: 'Part-Time Job', amount: 500.00, date: '2023-10-10' },
    { id: 2, source: 'Allowance', amount: 1000.00, date: '2023-10-20'},]; 

    const result = deleteIncome(3, incomes); 
    expect(result).toBeFalsy(); 
    expect(expenses).toHaveLength(2); 
})