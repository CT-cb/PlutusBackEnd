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

describe('limits/delete tests', () => {
    test('should delete limits for a given email and limitIds', async () => {
        const testEmail = 'test2@example.com';
        const limitIds = [uuidv4(), uuidv4()];

        const limitsData = [
            { email: testEmail, limitId: limitIds[0], maxLimit: 100, timeDivision: 'week' },
            { email: testEmail, limitId: limitIds[1], maxLimit: 200, timeDivision: 'month' },
        ];
  
        // Use Mongoose's create method to add test documents to the database
        const addedLimits = await LimitModel.create(limitsData);

        const response = await request(app)
        .delete('/limits/delete')
        .query({ 
            email: testEmail, 
            limitIds: limitIds.join(','),
        })
        .set('Accept', 'application/json');
  
      // Assertions
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('limit_delete_success');
    });
  
    test('should handle missing parameters', async () => {
      const response = await request(app)
        .delete('/limits/delete')
        .set('Accept', 'application/json');
  
      // Assertions
        expect(response.status).toBe(400);
    });
});

afterAll(() => {
    mongoose.connection.close();
});
