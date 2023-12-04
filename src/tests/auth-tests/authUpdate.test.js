require('jest');

const supertest = require('supertest');
const app = require('../../app').app;
const mongoose = require('mongoose');
const connectToMongo = require('../../connections/mongodb-connect-collin').connectToMongo;
let realEmail = "planwithplutus@gmail.com";
let realPwd = "abc123";

let fakeEmail = "fakeemail@fake.com";
let fakePwd = "fakepwd";

beforeEach(async()=>{
  // ensure a certain user exists in the DB
  let res = await supertest(app)
  .post('/auth/create')
  .send({
    email: realEmail,
    password: realPwd
  });

  await new Promise((r) => setTimeout(r, 2000));
})
afterAll(async ()=>{
  await mongoose.disconnect();
});

test("update works with a user in the database", async () =>{
    let res = await supertest(app)
    .put("/auth/update")
    .send({
      email: realEmail,
      password: realPwd,
      firstName: "New",
      lastName: "User"
    });

    console.log(res.body);
    expect(res.statusCode).toBe(200);

    await new Promise((r) => setTimeout(r, 2000));
});

test("update works with a user in the database", async () =>{
  let res = await supertest(app)
  .put("/auth/update")
  .send({
    email: realEmail,
    password: realPwd,
    lastName: "User"
  });

  console.log(res.body);
  expect(res.statusCode).toBe(200);

  await new Promise((r) => setTimeout(r, 2000));
});

test("update works with a user in the database", async () =>{
  let res = await supertest(app)
  .put("/auth/update")
  .send({
    email: realEmail,
    password: realPwd,
    firstName: "New",
  });

  console.log(res.body);
  expect(res.statusCode).toBe(200);

  await new Promise((r) => setTimeout(r, 2000));
});

test("update works with a user in the database", async () =>{
  let res = await supertest(app)
  .put("/auth/update")
  .send({
    email: realEmail,
    password: realPwd,
  });

  console.log(res.body);
  expect(res.statusCode).toBe(200);

  await new Promise((r) => setTimeout(r, 2000));
});

test("update doesn't work with a bad email",async()=>{
  let res = await supertest(app)
  .put("/auth/update")
  .send({
    email: fakeEmail,
    password: fakePwd
  });

  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("status","error");

  await new Promise((r) => setTimeout(r, 2000));
});

test("update doesn't work with a bad password but real email",async()=>{
  let res = await supertest(app)
  .put("/auth/update")
  .send({
    email: realEmail,
    password: fakePwd
  });

  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("status","error");

  await new Promise((r) => setTimeout(r, 2000));
});

test("update doesn't work with a missing param",async()=>{
  let res = await supertest(app)
  .put("/auth/update")
  .send({
    password: fakePwd
  });
  
  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("status","error");

  await new Promise((r) => setTimeout(r, 2000));
});