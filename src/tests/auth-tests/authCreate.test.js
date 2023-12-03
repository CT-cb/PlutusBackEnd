require('jest');
require('supertest');

let badEmail = "plutustestname";
let goodEmail = "plutustestname@plutus.com"
let pwd = "abc123"
const CreateUrl = "http://3.17.169.64:3000/auth/create"

test("create account post did not have proper json email", async () => {
        fetch(CreateUrl, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: badEmail,
    password: pwd,
    firstName: "Kaleb",
    lastName: "Hedrick"
  })
    }).then(response => response.json())
    .then(json => {
     return expect(json.status).toEqual("error");
    })
    .catch(error => {
      console.error(error);
    });
});

    test("create account post did not have a password", async () => {
        fetch(CreateUrl, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: goodEmail,
    password: "",
    firstName: "Kaleb",
    lastName: "Hedrick"
  })
    }).then(response => response.json())
    .then(json => {
     return expect(json.status).toEqual("error");
    })
    .catch(error => {
      console.error(error);
    });

});

    test("create account post did not have a first name", async () => {
        fetch(CreateUrl, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: goodEmail,
    password: pwd,
    firstName: "",
    lastName: "Hedrick"
  })
    }).then(response => response.json())
    .then(json => {
     return expect(json.status).toEqual("error");
    })
    .catch(error => {
      console.error(error);
    });
  });

    test("create account post did not have a last name", async () => {
        fetch(CreateUrl, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: goodEmail,
    password: pwd,
    firstName: "Kaleb",
    lastName: ""
  })
    }).then(response => response.json())
    .then(json => {
     return expect(json.status).toEqual("error");
    })
    .catch(error => {
      console.error(error);
    });
  });
