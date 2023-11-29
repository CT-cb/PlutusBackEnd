require('jest');
jest.setTimeout(10000);

const express = require('express');
const request = require('supertest');
const IncomeModel = require('../models/income-model');
const incomeRoute = require('../routes/income-route');

jest.mock('../models/income-model');

describe("return all incomes data", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all incomes for a valid email', async () => {
    const mockIncomes = [
      { email: 'test@example.com', amount: 100, currency: 'usd', type: 'salary' },
      { email: 'test@example.com', amount: 300, currency: 'usd', type: 'bonus' },
    ];

    IncomeModel.where.mockResolvedValueOnce(mockIncomes);

    const app = express();
    app.use('/incomes', incomeRoute);

    const response = await request(app).get('/incomes/all?email=test@example.com');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockIncomes);
  });

  it('should handle errors and return an error response', async () => {
    // Mock the behavior of IncomeModel to throw an error
    IncomeModel.where.mockRejectedValueOnce(new Error('Database error'));

    const app = express();
    app.use('/incomes', incomeRoute);

    // Make a request to the /incomes/all route
    const response = await request(app).get('/incomes/all?email=test@example.com');

    // Assert that the response status is 500 for the error case
    expect(response.status).toBe(500);

    // Assert that the response body contains an error message
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  });
});
