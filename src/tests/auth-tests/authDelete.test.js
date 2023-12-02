require('jest');
let badEmail = "plutustestname";
let goodEmail = "plutustestname@plutus.com"
let pwd = "abc123"
const CreateUrl = "http://3.17.169.64:3000/auth/create"
const DeleteUrl = "http://3.17.169.64:3000/auth/delete"
test("existing account is properly deleted",async () => {
    let Createres = await fetch(CreateUrl, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: goodEmail,
    password: pwd,
    firstName: "Kaleb",
    lastName: "Hedrick"
  })
    })
    let Createjson = await Createres.json();

    let Deleteres = await fetch(DeleteUrl, {
  method: 'DELETE',
  
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: goodEmail,
    password: pwd,
  })
})
    expect(await Deleteres).toEqual("delete_account_success");
});

   