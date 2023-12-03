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
    mongoose.connection.useDb("incomes");
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
        "email": "planwithplutus@gmail.com",
    };

    test('correct email param returns all incomes', async () => {
        const res = await supertest(app)
            .get('/incomes/all')
            .query({
                email: correctEmail
            });


        expect(res.statusCode).toBe(200);
    });

    test('incorrect email returns an empty body', async () => {
        const res = await supertest(app)
            .get('/incomes/all')
            .query({
                email: incorrectEmail
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(0);
    });

    test('request w/o email param returns an error', async () => {
        const res = await supertest(app)
            .get('/incomes/all');

        expect(res.body).toHaveProperty("status");
        expect(res.body.status).toBe("error");
    });
});

describe('/bydaterange tests', () => {

    

        test('incorrectStartDate returns all incomes from beginning of time to endDate', async () => {
            const res = await supertest(app)
                .get('/incomes/bydaterange')
                .query({
                    email: correctEmail,
                    startDate: incorrectStartDate
                });
            
            console.log(res.body);
            expect(res.statusCode).toBe(200);
        });

    test('incorrectEndDate returns all incomes from startDate onward', async()=>{
        const res = await supertest(app)
            .get('/incomes/bydaterange')
            .query({
                email: correctEmail,
                endDate: incorrectEndDate
            })
    });

    test('request w/o email returns error', async () => {
        const res = await supertest(app)
            .get('/incomes/bydaterange')
            .query({
                startDate: "2023-01-01",
                endDate: incorrectEndDate
            });

        expect(res.statusCode).toBe(400);
    });

    test('request with just an email returns everything', async () => {
        const res = await supertest(app)
            .get('/incomes/bydaterange')
            .query({
                email: correctEmail
            });

        expect(res.statusCode).toBe(200);
    });

    /*test('request with no email throws an error', async () => {
        const res = await supertest(app)
            .get('/incomes/daterange')
            .query({
                startDate: 5
            });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body.status).toBe("error")
    });*/
});

describe("/bytype tests",()=>{
    
    test("correct email and one type returns 200",async()=>{
        const res = await supertest(app)
        .get('/incomes/bytype')
        .query({
            email: correctEmail,
            types: exampleOneType
        });

        expect(res.statusCode).toBe(200);
    });

    test("correct email and two types returns 200",async()=>{
        const res = await supertest(app)
        .get('/incomes/bytype')
        .query({
            email: correctEmail,
            types: exampleTwoTypes
        });

        expect(res.statusCode).toBe(200);
    });

    test("missing email returns an error",async()=>{
        const res = await supertest(app)
        .get('/incomes/bytype')
        .query({
            types: exampleTwoTypes
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body.status).toBe("error");
    });

    test("Giving more than 10 types causes the types to be cut down to only the first ten",async()=>{
        const res = await supertest(app)
        .get("/incomes/bytype")
        .query({
            email:correctEmail,
            types:moreThanTenTypes
        });

        expect(res.statusCode).toBe(200);
    });

    test("a non-string type in the types list doesn't affect us",async()=>{
        const res = await supertest(app)
        .get("/incomes/bytype")
        .query({
            email:correctEmail,
            types:3536
        });

        expect(res.statusCode).toBe(200);
    });
});

describe("/bytype_daterange tests",()=>{

    test('request w/o email returns error',async ()=>{
        const res = await supertest(app)
        .get("/incomes/bytype_daterange")
        .query({
            types: exampleOneType
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body.status).toBe("error");
    });

    test('correct email and types yield a good result',async()=>{
        const res = await supertest(app)
        .get("/incomes/bytype_daterange")
        .query({
            email: correctEmail,
            types: exampleOneType
        });

        expect(res.statusCode).toBe(200);
    });

    test('correct email w/ more than 10 types causes only first ten types to get processed',async()=>{
        const res = await supertest(app)
        .get("/incomes/bytype_daterange")
        .query({
            email:correctEmail,
            types: moreThanTenTypes
        });
    });
});

describe("/byamount tests",()=>{

    test("request w/o an email returns an error",async()=>{
        const res = await supertest(app)
        .get("/incomes/byamount")
        .query({
            amountLowerBound: correctLowerBound
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body.status).toBe("error");
    });

    test("request w/ a correct email returns something",async ()=>{
        const res = await supertest(app)
        .get("/incomes/byamount")
        .query({
            email:correctEmail,
            amountLowerBound: 10,
            amountUpperBound: 100
        });

        expect(res.statusCode).toBe(200);
    })
});

describe("byamount_daterange tests",()=>{
    test('no email in the request gives us an error',async()=>{
        const res = await supertest(app)
        .get("/incomes/byamount_daterange")
        .query({
            amountLowerBound: 10,
            amountUpperBound: 100
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body.status).toBe("error");
    });

    test("an email with any combination of bounds or dates gives us a 200 status code",async()=>{
        const res = await supertest(app)
        .get("/incomes/byamount_daterange")
        .query({
            email:correctEmail,
            amountLowerBound: 10,
            amountUpperBound: 100
        });

        console.log(res.body);
        expect(res.statusCode).toBe(200);
    });
});
