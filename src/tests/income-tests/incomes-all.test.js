require('jest');
jest.setTimeout(30000);

const supertest = require('supertest')
const app = require('../../app.js').app;
const mongoose = require('mongoose');
const connectToMongoDb = require("../../connections/mongodb-connect-collin").connectToMongo;
const IncomeModel = require('../../models/income-model');

let connection = connectToMongoDb();

beforeAll(async () => {
    await mongoose.connection.useDb("incomes");
});

afterAll(async()=>{
    await mongoose.disconnect();
});

describe('returns all incomes data for a specific email from database', () => {
  //  it('should get all incomes for a specific email from the database', async () => {
    const testEmail = 'test@example.com'
    const invalidEmail = 'invalidEmail'
    test('should return all incomes for valid email', async() => {
        
        // Send a request to the API endpoint
        const response = await supertest(app)
            .get(`/incomes/all?email=${testEmail}`)
            .set('Accept', 'application/json');
        
        // Assertions
        expect(response.statusCode).toBe(200);
        if (response.body.length > 0){
            expect(response.body[0].email).toBe(testEmail);
        }
        
    });
  
    /*test('should handle invalid email', async () => {
        // Send a request to the API endpoint with an invalid email
        const response = await supertest(app)
            .get('/incomes/all')
            .set('Accept', 'application/json')
            .query({
                email: invalidEmail
            });

        // Assertions
        expect(response.statusCode).toBe(400); 
    });*/

    test('should handle errors for null email', async () => {
        let res = await supertest(app)
            .get('/incomes/all')
            .set('Accept', 'application/json')
            .query({
                notanemail: "no"
            });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body).toHaveProperty('message');
    });
});
  

afterAll(() => {
    mongoose.connection.close();
});

