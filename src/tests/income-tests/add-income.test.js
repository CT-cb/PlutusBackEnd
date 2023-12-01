//Use the jest framework and establish a timeout
require('jest');
jest.setTimeout(10000);

//Also use the supertest framework
const request = require('supertest');

const app = require('../../app.js').app;
const mongoose = require('mongoose');
const connectToMongoDb = require("../../connections/mongodb-connect-collin").connectToMongo;
const IncomeModel = require('../../models/income-model');

let connection = connectToMongoDb();
const req = request(app);


//Connecting to the database
beforeAll(() => {
    mongoose.connection.useDb("incomes");
});

//Collection of adding income tests
describe('/add tests', () => {

    let correctObj = new IncomeModel({
        "email":"planwithplutus@gmail.com",
        "amount":1000,
        "currency":"usd",
        "incomeDate":"2021-10-23T21:03:01.522+00:00",
        "type":"direct_deposit"
    });

    let incorrectObj = {
        "email":"planwithplutus@gmail.com",
        "amount":1000,
        "currency":"usd",
        "incomeDate":Date.now(),
        "type":"direct_deposit"
    }

    //Test that the correct object gets added to the database
    test('correct obj is added', async () => {
        let res = await req
            .post('/incomes/add')
            .send(JSON.stringify(correctObj))
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 'income_add_success');
    });

});


// disconnecting from the database
afterAll(() => {
    mongoose.disconnect();
});

