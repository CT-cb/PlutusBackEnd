require('jest');
jest.setTimeout(10000);

const supertest = require('supertest');
const app = require('../../app.js').app;
const mongoose = require('mongoose');
const connectToMongoDb = require("../../connections/mongodb-connect-collin").connectToMongo;
//let connection = connectToMongoDb();
//const req = supertest(app);

beforeEach(async () => {
    await connectToMongoDb();
    
    await new Promise((r) => setTimeout(r, 2000));
});

afterAll(async()=>{
    await mongoose.disconnect();

    await new Promise((r) => setTimeout(r, 2000));
})
let idToDelete = "0";

describe('/delete tests', () => {
    
    
    
    let correctEmail = "planwithplutus@gmail.com";
    let incorrectEmail = "thisemaildoesntexist@problem.bomb";

    let dummyIdsToDelete = "0";
    let nullIds = null;
    test('request w/ correct email returns 200', async () => {
        //await connectToMongoDb();
        const res = await supertest(app)
            .delete('/incomes/delete')
            .query({
                email: correctEmail,
                incomeIds: dummyIdsToDelete
            });

        expect(res.statusCode).toBe(200);
        await new Promise((r) => setTimeout(r, 2000));
    });

    test('request w/o ids returns an error', async () => {
        //await connectToMongoDb();
        const res = await supertest(app)
            .delete('/incomes/delete')
            .query({
                email: incorrectEmail
            });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body.status).toBe("error");
        await new Promise((r) => setTimeout(r, 2000));
    });

});


