// use the jest framework and establish a timeout
require('jest');
jest.setTimeout(10000);

const app = require('../../app.js').app;
const mongoose = require('mongoose');
const connectToMongoDb = require("../../connections/mongodb-connect-collin").connectToMongo;
const IncomeModel = require('../../models/income-model');

let connection = connectToMongoDb();
const req = request(app);


// connecting to the database
beforeAll(() => {
    mongoose.connection.useDb("incomes");
});


describe('/add tests', () => {


    //Testing if the transaction date matches
    test("Should match the transaction date for the correct object", () => {
        let correctObj = new IncomeModel({
            "email":"planwithplutus@gmail.com",
            "amount":300,
            "method":"credit_card",
            "type":"vacation",
            "currency":"usd",
            "incomeDate":"2021-10-23T21:03:01.522+00:00"
        });

        
        expect(correctObj.someFunction()).toBe(someExpectedValue);

    });

        let incorrectObj = {
            "email": "planwithplutus@gmail.com",
            "currency": "usd",
            "expenseDate": Date.now()
        }

});




// disconnecting from the database
afterAll(async () => {
    mongoose.disconnect();
});