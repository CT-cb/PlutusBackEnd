require('jest');
const supertest = require('supertest');
const app = require('../../app').app;
const mongoose = require('mongoose');
const connectToMongo = require('../../connections/mongodb-connect-collin').connectToMongo;
let realEmail = "plutustestname@plutus.com";
let correctEmail = `newemail${new Date().getTime()}@plutus.com`;
let incorrectEmail = "newEmail@something";
let password = "abc123";
let wrongPassword = "wrongpassword";

let noEmail = {
  password: password
};

let noPassword = {
  email: correctEmail
};

let incorrectObjBadEmail = {
  email: incorrectEmail,
  password: password
}

let incorrectObjWrongPwd = {
  email: "planwithplutus@gmail.com",
  password: wrongPassword
};

let correctObj = {
  email: realEmail,
  password: password
};

beforeAll(async()=>{
  await connectToMongo();
  let res = supertest(app)
  .post('/auth/create')
  .send(correctObj);

  await new Promise((r) => setTimeout(r, 2000));
});

afterAll(async()=>{
  await mongoose.disconnect();

  await new Promise((r) => setTimeout(r, 2000));
});

test("request w/o email returns error", async () => {
  let res = await supertest(app)
  .delete("/auth/delete")
  .send(noEmail);

  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("status","error");

  await new Promise((r) => setTimeout(r, 2000));
});

test("request w/o password returns error", async () => {
  let res = await supertest(app)
  .delete("/auth/delete")
  .send(noPassword);

  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("status","error");

  await new Promise((r) => setTimeout(r, 2000));
});

test("request with bad email returns error", async () => {
  let res = await supertest(app)
  .delete("/auth/delete")
  .send(incorrectObjBadEmail);

  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("status","error");

  await new Promise((r) => setTimeout(r, 2000));
});

test("request w/o correct email but wrong pwd returns error", async () => {
  let res = await supertest(app)
  .delete("/auth/delete")
  .send(incorrectObjWrongPwd);

  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("status","error");

  await new Promise((r) => setTimeout(r, 2000));
});

test("request w correct credentials gets the job done", async () => {
  let res = await supertest(app)
  .delete("/auth/delete")
  .send(correctObj);

  expect(res.statusCode).toBe(200);

  await new Promise((r) => setTimeout(r, 2000));
});