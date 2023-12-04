require('jest');
jest.setTimeout(10000);

const supertest = require('supertest');
const app = require('../../app.js').app;
const mongoose = require('mongoose');
const connectToMongoDb = require("../../connections/mongodb-connect-collin.js").connectToMongo;
const LimitModel = require('../../models/limit-model.js');

//let connection = connectToMongoDb();
//const req = supertest(app);

beforeAll(async () => {
    await connectToMongoDb();

    await new Promise((r) => setTimeout(r, 2000));
});

afterAll(async ()=>{
    await mongoose.disconnect();

    await new Promise((r) => setTimeout(r, 2000));
});

describe('/add tests', () => {

    let correctObjBothDates = {
        "email": "planwithplutus@gmail.com",
        "maxLimit": 999,
        "timeDivision":"month",
        "currency": "usd",
        "startDate": "2023-10-23",
        "endDate":"2024-10-23"
    };

    let correctObjNoCurrency = {
        "email": "planwithplutus@gmail.com",
        "maxLimit": 999,
        "timeDivision":"month",
        "startDate": "2023-10-23",
        "endDate":"2024-10-23"
    }

    let correctObjNoEndDate = {
        "email": "planwithplutus@gmail.com",
        "maxLimit": 999,
        "timeDivision":"month",
        "currency": "usd",
        "startDate": "2023-10-23"
    };

    let correctObjNoDates= {
        "email": "planwithplutus@gmail.com",
        "maxLimit": 999,
        "timeDivision":"month",
        "currency": "usd"
    };

    let incorrectObj = {
        "email": "planwithplutus@gmail.com",
        "currency": "usd",
        "startDate": Date.now()
    };

    test('correct obj is added correctly', async () => {
        const res = await supertest(app)
            .post('/limits/add')
            .send(correctObjBothDates);
            /*.set('Content-Type', 'application/json')
            .set('Accept', 'application/json')*/
            /*.expect((res)=>{
                res.sta
            })
            .end(function(err,res){
                if (err) throw err;
                if (res) console.log(res.body);
            })*/
        console.log(res.body);
        expect(res.statusCode).toBe(200);
        
        //mongoose.disconnect();

        await new Promise((r) => setTimeout(r, 2000));
    });

    test('correct obj w/o currency is added correctly', async () => {
        const res = await supertest(app)
            .post('/limits/add')
            .send(correctObjNoCurrency);
            /*.set('Content-Type', 'application/json')
            .set('Accept', 'application/json')*/
            /*.expect((res)=>{
                res.sta
            })
            .end(function(err,res){
                if (err) throw err;
                if (res) console.log(res.body);
            })*/
        console.log(res.body);
        expect(res.statusCode).toBe(200);
        //mongoose.connection.close();
        //mongoose.disconnect();

        await new Promise((r) => setTimeout(r, 2000));
    });

    test('incorrect obj is not added', async () => {
        let res = await supertest(app)
            .post('/limits/add')
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
            .post('/limits/add')
            .send(null);

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('status', 'error');
        //expect(res.body).toHaveProperty('errorType');
        expect(res.body).toHaveProperty('message');

        await new Promise((r) => setTimeout(r, 2000));
    });
});

