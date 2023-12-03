require('jest');
jest.setTimeout(10000);

const supertest = require('supertest');
const app = require('../../app.js').app;
const mongoose = require('mongoose');
const connectToMongoDb = require("../../connections/mongodb-connect-collin").connectToMongo;
//let connection = connectToMongoDb();
//const req = supertest(app);



let idToDelete = "0";

describe('/delete tests', () => {
    beforeAll(async () => {
        await connectToMongoDb();
        
        await mongoose.connection.useDb("incomes");
    });
    
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
            .delete('/incomes/delete')
            .query({
                email: correctEmail,
                incomeIds: dummyIdsToDelete
            });
        console.log(res.body);

        expect(res.statusCode).toBe(200);

    });

    test('request w/o ids returns an error', async () => {
        //await connectToMongoDb();
        const res = await supertest(app)
            .delete('/incomes/delete')
            .query({
                email: incorrectEmail
            });

        console.log(res.body);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body.status).toBe("error");
        mongoose.disconnect();
    });

});


