require('jest');
jest.setTimeout(10000);

const supertest = require('supertest');
const app = require('../../app.js').app;
const mongoose = require('mongoose');
const connectToMongoDb = require("../../connections/mongodb-connect-collin").connectToMongo;
const ExpenseModel = require('../../models/expense-model');

//let connection = connectToMongoDb();
//const req = supertest(app);

beforeEach(async () => {
    await connectToMongoDb();

    await new Promise((r) => setTimeout(r, 2000));
});

afterAll(async ()=>{
    await mongoose.disconnect();

    await new Promise((r) => setTimeout(r, 2000));
});


describe('/add tests', () => {

    let correctObj = {
        "email": "planwithplutus@gmail.com",
        "amount": 999,
        "method": "credit_card",
        "type": "vacation",
        "currency": "usd",
        "expenseDate": "2023-10-23T21:03:01.522+00:00",
        "payee":{
            "name":"Test",
            "type":"yes",
            "description":"Something cool."
        }
    };

    let correctObjNoType = {
        "email": "planwithplutus@gmail.com",
        "amount": 999,
        "method": "credit_card",
        "currency": "usd",
        "expenseDate": "2023-10-23T21:03:01.522+00:00",
        "payee":{
            "name":"Test",
            "type":"yes",
            "description":"Something cool."
        }
    };

    let correctObjNoPayee = {
        "email": "planwithplutus@gmail.com",
        "amount": 999,
        "method": "credit_card",
        "type": "vacation",
        "currency": "usd",
        "expenseDate": "2023-10-23T21:03:01.522+00:00"
    }

    let incorrectObj = {
        "email": "planwithplutus@gmail.com",
        "currency": "usd",
        "expenseDate": Date.now()
    }

    it('correct obj is added correctly', async () => {
        const res = await supertest(app)
            .post('/expenses/add')
            .send(correctObj);
            /*.set('Content-Type', 'application/json')
            .set('Accept', 'application/json')*/
            /*.expect((res)=>{
                res.sta
            })
            .end(function(err,res){
                if (err) throw err;
                if (res) console.log(res.body);
            })*/

        expect(res.statusCode).toBe(200);
        //mongoose.connection.close();
        //mongoose.disconnect();

        await new Promise((r) => setTimeout(r, 2000));
    });

    it('correct obj is added correctly', async () => {
        const res = await supertest(app)
            .post('/expenses/add')
            .send(correctObjNoType);
            /*.set('Content-Type', 'application/json')
            .set('Accept', 'application/json')*/
            /*.expect((res)=>{
                res.sta
            })
            .end(function(err,res){
                if (err) throw err;
                if (res) console.log(res.body);
            })*/

        expect(res.statusCode).toBe(200);
        //mongoose.connection.close();
        //mongoose.disconnect();
    });

    it('correct obj is added correctly', async () => {
        const res = await supertest(app)
            .post('/expenses/add')
            .send(correctObjNoPayee);
            /*.set('Content-Type', 'application/json')
            .set('Accept', 'application/json')*/
            /*.expect((res)=>{
                res.sta
            })
            .end(function(err,res){
                if (err) throw err;
                if (res) console.log(res.body);
            })*/

        expect(res.statusCode).toBe(200);
        //mongoose.connection.close();
        //mongoose.disconnect();

        await new Promise((r) => setTimeout(r, 2000));
    });

    test('incorrect obj is not added', async () => {
        let res = await supertest(app)
            .post('/expenses/add')
            .send(incorrectObj);

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body).toHaveProperty('errorType');
        expect(res.body).toHaveProperty('message');
        //mongoose.disconnect();

        await new Promise((r) => setTimeout(r, 2000));
    });



    test('null payload is not added', async () => {
        let res = await supertest(app)
            .post('/expenses/add')
            .send(null);

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('status', 'error');
        //expect(res.body).toHaveProperty('errorType');
        expect(res.body).toHaveProperty('message');
        
        await new Promise((r) => setTimeout(r, 2000));
    });
});

/*afterAll(async () => {
    await mongoose.disconnect();
    //mongoose.disconnect();
    //await mongoose.disconnect();
    //mongoose.disconnect();
    //mongoose.disconnect();
});*/
