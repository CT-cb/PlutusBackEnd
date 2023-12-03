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