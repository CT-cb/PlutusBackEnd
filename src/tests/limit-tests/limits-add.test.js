require('jest');
jest.setTimeout(10000);

const request = require('supertest');
const app = require('../../app.js').app;
const mongoose = require('mongoose');
const connectToMongoDb = require("../../connections/mongodb-connect-collin").connectToMongo;
const LimitModel = require('../../models/limit-model');

const { v4: uuidv4 } = require('uuid');

let connection = connectToMongoDb();

beforeAll(() => {
    mongoose.connection.useDb("limits");
});

describe('limits/add tests', () => {
    test('should add a limit given a email and maxLimit', async () => {
        // const testEmail = 'test2@example.com';
        // const maxLimit = 1000;

        // const limitsData = [
        //     { email: testEmail, limitId: limitIds[0], maxLimit: maxLimit, timeDivision: 'week' },
        //     { email: testEmail, limitId: limitIds[1], maxLimit: maxLimit, timeDivision: 'month' },
        // ];
        
        // Use Mongoose's create method to add test documents to the database
        // const addedLimits = await LimitModel.create(limitsData);
        let limitInfo = {
            "email" : "planwithplutus@gmail.com",
            "maxLimit" : 1000,
            "timeDivision" : "month",
            "startDate" : "2023-12-12",
            "endDate" : "2024-12-12",
            "currency" : "usd"
        }
        const response = await request(app)
        .post('/limits/add')
        .send(limitInfo);
  
      // Assertions
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('limit_add_success');
    });
  
    test('should handle missing parameters', async () => {
      const response = await request(app)
        .post('/limits/add')
        .set('Accept', 'application/json');
  
      // Assertions
        expect(response.status).toBe(400);
    });
});

afterAll(() => {
    mongoose.connection.close();
});