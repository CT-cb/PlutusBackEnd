require('jest');
jest.setTimeout(30000);

const request = require('supertest')
const app = require('../../app.js').app;
const mongoose = require('mongoose');
const connectToMongoDb = require("../../connections/mongodb-connect-collin").connectToMongo;
const IncomeModel = require('../../models/income-model');

let connection = connectToMongoDb();
const req = request(app);
beforeAll(() => {
    mongoose.connection.useDb("incomes");
    console.log("current db: ", mongoose.connection.db);    //
});
/*
async function findDocumentsWithValidEmail() {
    try {
      const result = await IncomeModel.find({ email: 'planwithplutus@gmail.com' });
      console.log(result);
    } catch (error) {
      console.error('Error finding documents:', error);
    } 
}
findDocumentsWithValidEmail();
*/


describe("return all incomes data", () => {

    let validEmail = 'planwithplutus@gmail.com';
    let invalidEmail = 'invalid@example.com';


    test('should return all incomes for a valid email', async () => {
        const res = await req
            .get('/incomes/all?email=planwithplutus@gmail.com')
            .set('Accept', 'application/json');
    
        expect(res.statusCode).toBe(200);
        // Assuming the response is an array and you want to check the first element
        expect(res.body[0]).toHaveProperty('status', 'success');
        expect(res.body[0]).toHaveProperty('incomes');
        expect(Array.isArray(res.body[0].incomes)).toBe(true);

    });

      //  expect(res.body).toHaveProperty('status', 'success');
      //  expect(res.body).toHaveProperty('incomes');
      //  expect(Array.isArray(res.body[0].incomes)).toBe(true);
    });    
    /*
    test('should handle errors for an invalid email', async () => {
        let res = await req
            .get(`/incomes/all?email=${invalidEmail}`)
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body).toHaveProperty('errorType');
        expect(res.body).toHaveProperty('message');
    });

    test('should handle errors for null email', async () => {
        let res = await req
            .get('/incomes/all')
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body).toHaveProperty('message');
    });
});
*/
afterAll(() => {
    mongoose.connection.close();
});

