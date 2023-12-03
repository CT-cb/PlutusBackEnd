require('jest');
const supertest = require('supertest');
const app = require('../../app').app;
const mongoose = require('mongoose');
let realEmail = "planwithplutus@gmail.com";
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

afterAll(async()=>{
  await mongoose.disconnect();
});

test("request w/o email returns error", async () => {
  let res = await supertest(app)
  .delete("/auth/delete")
  .send(noEmail);

  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("status","error");
});

test("request w/o password returns error", async () => {
  let res = await supertest(app)
  .delete("/auth/delete")
  .send(noPassword);

  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("status","error");
});

test("request with bad email returns error", async () => {
  let res = await supertest(app)
  .delete("/auth/delete")
  .send(incorrectObjBadEmail);

  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("status","error");
});

test("request w/o correct email but wrong pwd returns error", async () => {
  let res = await supertest(app)
  .delete("/auth/delete")
  .send(incorrectObjWrongPwd);

  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("status","error");
});

test("request w correct credentials gets the job done", async () => {
  let res = await supertest(app)
  .delete("/auth/delete")
  .send(correctObj);

  expect(res.statusCode).toBe(200);
});