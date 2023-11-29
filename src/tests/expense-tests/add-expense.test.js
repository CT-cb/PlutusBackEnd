require('jest');
jest.setTimeout(10000);

const request = require('supertest');
const app = require('../../app.js').app;
const mongoose = require('mongoose');
const connectToMongoDb = require("../../connections/mongodb-connect-collin").connectToMongo;
const ExpenseModel = require('../../models/expense-model');

let connection = connectToMongoDb();
const req = request(app);

beforeAll(() => {

    mongoose.connection.useDb("expenses");
});



describe('/add tests', () => {

    let correctObj = new ExpenseModel({
        "email":"planwithplutus@gmail.com",
        "amount":300,
        "method":"credit_card",
        "type":"vacation",
        "currency":"usd",
        "expenseDate":"2021-10-23T21:03:01.522+00:00"
    });

    let incorrectObj = {
        "email": "planwithplutus@gmail.com",
        "currency": "usd",
        "expenseDate": Date.now()
    }

    test('correct obj is added correctly', async () => {
        let res = await req
            .post('/expenses/add')
            .send(JSON.stringify(correctObj))
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
            /*.end(function(err,res){
                if (err) throw err;
                if (res) console.log(res);
            })*/

        console.log(res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 'expense_add_success');
        expect(res.body).toHaveProperty('id');
        //expect(res.body.id).toBeInstanceOf(string);
        
    });

    test('incorrect obj is not added', async () => {
        let res = await req
            .post('/expenses/add')
            .send(JSON.stringify(incorrectObj))
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
            /*.end(function(err,res){
                if (err) throw err;
                if (res) console.log(res);
            });*/

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body).toHaveProperty('errorType');
        expect(res.body).toHaveProperty('message');
    });

    test('null payload is not added', async () => {
        let res = await req
            .post('/expenses/add')
            .send(JSON.stringify(null))
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('status', 'error');
        //expect(res.body).toHaveProperty('errorType');
        expect(res.body).toHaveProperty('message');
    });
});

afterAll(() => {
    //mongoose.disconnect();
});