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
});

describe('returns all incomes data for a specific email from database', () => {
  //  it('should get all incomes for a specific email from the database', async () => {
    const testEmail = 'test@example.com'
    const invalidEmail = 'invalidEmail'
    test('should return all incomes for valid email', async() => {
        
        // Send a request to the API endpoint
        const response = await request(app)
        .get('/incomes/all')
        .query({ email: testEmail })
        .set('Accept', 'application/json');
        
        // Assertions
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(2); // Assuming there are 2 test incomes
        expect(response.body[0].email).toBe(testEmail);
    });
  
    test('should handle invalid email', async () => {
        // Send a request to the API endpoint with an invalid email
        const response = await request(app)
            .get(`/incomes/all`)
            .query({ email: invalidEmail })
            .set('Accept', 'application/json');

        // Assertions
        expect(response.statusCode).toBe(200); 
        expect(response.body).toHaveLength(0);
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
  

afterAll(() => {
    mongoose.connection.close();
});

