require('jest');
jest.setTimeout(10000);

const supertest = require('supertest');
const app = require('../../app.js').app;
const mongoose = require('mongoose');
const connectToMongoDb = require("../../connections/mongodb-connect-collin").connectToMongo;
const ExpenseModel = require('../../models/expense-model');

//let connection = connectToMongoDb();
//const req = supertest(app);

beforeAll(async () => {
    await connectToMongoDb();
    
    await new Promise((r) => setTimeout(r, 2000));
});

afterAll(async()=>{
    await mongoose.disconnect();

    await new Promise((r) => setTimeout(r, 2000));
})
let idToDelete = "0";

describe('/delete tests', () => {
    
    
    /*afterEach(async () => {
        await mongoose.disconnect();
    });*/
    let correctEmail = "planwithplutus@gmail.com";
    let incorrectEmail = "thisemaildoesntexist@problem.bomb";

    let dummyIdsToDelete = "0";
    let nullIds = null;
    test('request w/ correct email returns 200', async () => {
        //await connectToMongoDb();
        const res = await supertest(app)
            .delete('/expenses/delete')
            .query({
                email: correctEmail,
                expenseIds: dummyIdsToDelete
            });
        console.log(res.body);

        expect(res.statusCode).toBe(200);
        
        await new Promise((r) => setTimeout(r, 2000));
    });

    test('request w/o ids returns an error', async () => {
        //await connectToMongoDb();
        const res = await supertest(app)
            .delete('/expenses/delete')
            .query({
                email: incorrectEmail
            });

        console.log(res.body);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body.status).toBe("error");

        await new Promise((r) => setTimeout(r, 2000));
    });

});


