//Use the jest framework and establish a timeout
require('jest');
jest.setTimeout(10000);

//Also use the supertest framework
const supertest = require('supertest');

const app = require('../../app.js').app;
const mongoose = require('mongoose');
const connectToMongoDb = require("../../connections/mongodb-connect-collin").connectToMongo;
const IncomeModel = require('../../models/income-model');

let connection = connectToMongoDb();


//Connecting to the database
beforeAll(async () => {
    await connectToMongoDb();
    await mongoose.connection.useDb("incomes");
});


//Collection of adding income tests
describe('/add tests', () => {

    let correctObj = {
        "email":"planwithplutus@gmail.com",
        "amount":1000,
        "currency":"usd",
        "incomeDate":"2021-10-23T21:03:01.522+00:00",
        "type":"direct_deposit",
        "source":{
            "name":"Internship",
            "description":"Something cool."
        }
    };

    let correctObjNoSource = {
        "email":"planwithplutus@gmail.com",
        "amount":1000,
        "currency":"usd",
        "incomeDate":"2021-10-23T21:03:01.522+00:00",
        "type":"direct_deposit"
    }

    let incorrectObj = {
        "email":"planwithplutus@gmail.com"
    }

    //Test that the correct object gets added to the database
    test('correct obj is added', async () => {
        let res = await supertest(app)
            .post('/incomes/add')
            .send(correctObj);

            console.log(res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 'income_add_success');
    });

    //Test that the correct object with no source gets added to the database
    test('correct obj is added', async () => {
        let res = await supertest(app)
            .post('/incomes/add')
            .send(correctObjNoSource)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 'income_add_success');
    });
    
    //Test that the incorrect income doesn't get added
    test('incorrect object is not added', async () => {
        let res = await supertest(app)
            .post('/incomes/add')
            .send(incorrectObj)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body).toHaveProperty('message');
    });

    //Test that a null income doesn't get added
    test('null payload is not added', async () => {
        let res = await supertest(app)
            .post('/incomes/add')
            .send(null)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body).toHaveProperty('message');
    });


});

// disconnecting from the database
afterAll(() => {
    mongoose.disconnect();
});

