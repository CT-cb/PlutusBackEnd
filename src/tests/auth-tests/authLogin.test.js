require('jest');
let badEmail = "plutustestname";
let goodEmail = "plutustestname@plutus.com"
let pwd = "abc123"
const LoginUrl = "http://3.17.169.64:3000/auth/login"

test("login works with a user in the database", () =>{
    fetch(LoginUrl, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: goodEmail,
    password: pwd,
  })
    })}).then(response => response.json())
    .then(json => {
     return expect(json.status).toEqual("auth_success");
    })
    .catch(error => {
      console.error(error);
});

test("login doesnt work with a user not in the database", () =>{
    fetch(LoginUrl, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  
  body: JSON.stringify({
    email: goodEmail,
    password: pwd,
  })
    })}).then(response => response.json())
    .then(json => {
     return expect(json.status).toEqual("error");
    })
    .catch(error => {
      console.error(error);
});