require('jest');
jest.setTimeout(30000);

const request = require('supertest')
const app = require('../../app.js').app;
const mongoose = require('mongoose');
const connectToMongoDb = require("../../connections/mongodb-connect-collin").connectToMongo;
const IncomeModel = require('../../models/income-model');

let connection = connectToMongoDb();

const req = request(app);
beforeAll(async () => {
    await connectToMongoDb();
    await new Promise((r) => setTimeout(r, 2000));
});

describe('incomes/bytype tests', () => {

    test('should get incomes by type', async () => {
        const testEmail = 'test@example.com';
        const testType = 'direct_deposit'; 
        const testType2 = 'salary';
    
        // Send a request to the API endpoint
        const response = await req
            .get(`/incomes/bytype`)
            .query({ email: testEmail, types: testType })
            .set('Accept', 'application/json');

    
        // Assertions
        expect(response.status).toBe(200);

        await new Promise((r) => setTimeout(r, 2000));
      });

    test('should handle missing parameters', async () => {
        const response = await req
            .get(`/incomes/bytype`)
            .set('Accept', 'application/json');
    
        // Assertions
        expect(response.status).toBe(400);

        await new Promise((r) => setTimeout(r, 2000));
    });

    /*test('should handle invalid email', async () => {
        const invalidEmail = 'invalidemail@example.com'; 
    
        const response = await request(app)
            .get(`/incomes/bytype`)
            .query({ email: invalidEmail, types: 'Salary' })
            .set('Accept', 'application/json');
    
        // Assertions
        expect(response.status).toBe(400);
    });*/
    
})


afterAll(async() => {
    await mongoose.disconnect();

    await new Promise((r) => setTimeout(r, 2000));
})
