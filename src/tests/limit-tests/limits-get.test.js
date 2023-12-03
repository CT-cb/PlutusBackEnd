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

describe('limits/all tests', () => {
    test('should get all limits given an email', async () => {
    
        const email = "planwithplutus@gmail.com";
        const response = await request(app)
        .get('/limits/all')
        .query({
            email: email
        });
  
      // Assertions
      expect(response.status).toBe(200);
    });
    test('should throw placeholder error if given an incorrect email', async () => {

        const email = "incorrectemail1231141414141245@email.com";
        const response = await request(app)
        .get('/limits/all')
        .query({
            email: email
        });
  
      // Assertions
      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('placeholder error');

    });
    test('should handle missing parameters', async () => {
      const response = await request(app)
        .get('/limits/all')
        .set('Accept', 'application/json');
  
      // Assertions
        expect(response.status).toBe(400);
    });
});

afterAll(() => {
    mongoose.connection.close();
});