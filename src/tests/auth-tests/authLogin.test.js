require('jest');

const supertest = require('supertest');
const app = require('../../app').app;
const mongoose = require('mongoose');

let realEmail = "planwithplutus@gmail.com";
let realPwd = "abc123";

let fakeEmail = "fakeemail@fake.com";
let fakePwd = "fakepwd";

afterAll(async ()=>{
  await mongoose.disconnect();
});

test("login works with a user in the database", async () =>{
    let res = await supertest(app)
    .post("/auth/login")
    .send({
      email: realEmail,
      password: realPwd
    });

    expect(res.statusCode).toBe(200);
});

test("login doesn't work with a bad email",async()=>{
  let res = await supertest(app)
  .post("/auth/login")
  .send({
    email: fakeEmail,
    password: fakePwd
  });

  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("status","error");
});

test("login doesn't work with a bad password but real email",async()=>{
  let res = await supertest(app)
  .post("/auth/login")
  .send({
    email: realEmail,
    password: fakePwd
  });

  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("status","error");
});

test("login doesn't work with a missing param",async()=>{
  let res = await supertest(app)
  .post("/auth/login")
  .send({
    password: fakePwd
  });

  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("status","error");
});