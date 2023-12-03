require('jest');
jest.setTimeout(10000);

const supertest = require('supertest');
const app = require('../../app.js').app;
const mongoose = require('mongoose');
const connectToMongoDb = require("../../connections/mongodb-connect-collin").connectToMongo;

//let connection = connectToMongoDb();
//const req = supertest(app);

beforeAll(async () => {
    
    //await connectToMongoDb();
    mongoose.connection.useDb("limits");
});

afterAll(async () => {
    await mongoose.disconnect();
});


let correctEmail = "planwithplutus@gmail.com";
let incorrectEmail = "thisemaildoesntexist@problem.bomb";

let correctStartDate = "2023-11-23";
let incorrectStartDate = 35;

let correctEndDate = "2023-11-30";
let incorrectEndDate = "4001-01-01";

let exampleTwoTypes="vacation,business";
let exampleOneType="business";
let moreThanTenTypes="business,vacation,fun,taxes,random,misc,boating,horses,ukelele,dancing,type11,type12,type13";

let negativeAmount = -10;
let correctLowerBound = 10;
let correctUpperBound = 35;
let excessiveUpperBound = 999999999999;


describe('/all tests', () => {

    let correctRequest = {
        email: "planwithplutus@gmail.com",
        limitIds: "0,1"
    };

    test('correct email param returns all limits', async () => {
        const res = await supertest(app)
            .get('/limits/all')
            .query({
                email: correctEmail
            });


        expect(res.statusCode).toBe(200);
    });

    test('incorrect email returns an empty body', async () => {
        const res = await supertest(app)
            .get('/limits/all')
            .query({
                email: incorrectEmail
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(0);
    });

    test('request w/o email param returns an error', async () => {
        const res = await supertest(app)
            .get('/limits/all');

        expect(res.body).toHaveProperty("status");
        expect(res.body.status).toBe("error");
    });
});


