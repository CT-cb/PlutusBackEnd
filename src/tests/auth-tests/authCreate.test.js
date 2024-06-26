require('jest');

const mongoose = require('mongoose');
const supertest = require('supertest');
const { connectToMongo } = require('../../connections/mongodb-connect-collin');
const app = require('../../app').app;

let correctEmail = `newemail${new Date().getTime()}@plutus.com`;
let incorrectEmail = "newEmail@something";
let password = "abc123";

let noEmail = {
  password: password
};

let noPassword = {
  email: correctEmail
};

let correctObj = {
  email: correctEmail,
  password: password
};

beforeAll(async()=>{
  await connectToMongo();

  await new Promise((r) => setTimeout(r, 2000));
})
afterAll(async()=>{
  await mongoose.disconnect();

  await new Promise((r) => setTimeout(r, 2000));
})

test("create account post did not have proper json email", async () => {
    let res = await supertest(app)
    .post("/auth/create")
    .send(noEmail);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("status","error");

    await new Promise((r) => setTimeout(r, 2000));
});

test("create account post did not have proper password", async () => {
  let res = await supertest(app)
  .post("/auth/create")
  .send(noPassword);

  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("status","error");

  await new Promise((r) => setTimeout(r, 2000));
});

test("request w/ username and passowrd works",async()=>{
  let res = await supertest(app)
  .post("/auth/create")
  .send(correctObj);

  expect(res.statusCode).toBe(200);

  await new Promise((r) => setTimeout(r, 2000));
});
