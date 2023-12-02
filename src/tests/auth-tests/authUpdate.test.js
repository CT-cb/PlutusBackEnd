require('jest');
let badEmail = "plutustestname";
let goodEmail = "plutustestname@plutus.com"
let newEmail = "plutustestname1@plutus.com"
let pwd = "abc123"
const UpdateUrl = "http://3.17.169.64:3000/auth/update"

test("updating user info returns a success", () =>{
    fetch(UpdateUrl, {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: newEmail,
    password: pwd,
  })
    })}).then(response => response.json())
    .then(json => {
     return expect(json.status).toEqual("update_account_success");
    })
    .catch(error => {
      console.error(error);
});

