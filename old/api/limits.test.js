import { calculateDailyMax } from "./limits";

beforeEach(() => {
    userId = null;
})

test("Calling calculate daily max for 7 days with $700"), () => {
    //Need to set up a fake user with 700 total
    let daysToAdd = 7;
    let currentDate = new Date();
    let weekLater = currentDate.setDate(currentDate.getDate() + daysToAdd); 
    let dailyMax = calculateDailyMax(userId, weekLater);
    expect(dailyMax).toEqual(100);
}