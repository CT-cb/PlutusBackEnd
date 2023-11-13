import {authenticate, createUser, addNewUserData} from './authentication.js'

//authenticate tests

test("Authentication returns true if the user is in the database", () => {
    let Username = "testUser"
    let Password = "T4stP@ssword"
    createUser(Username, Password);
    expect(authenticate(Username, Password)).toBeTruthy();
})

test("Authentication returns false if the user is not in the database", () => {
    let Username = "testUser"
    let Password = "T4stP@ssword"
    createUser(Username, Password);
    expect(authenticate("NotTestUser", Password)).toBeFalsy();
})

//createUser tests
test("createUser returns a string for userID given valid creds", () => {
    let Username = "testUser"
    let Password = "T4stP@ssword"
    expect(createUser(Username, Password)).toBeInstanceOf(String);
})

test("createUser returns -1 if the user creation failed", () => {
    let Username = "Invalid Username"
    let Password = "T4stP@ssword"
   let userID = createUser(Username, Password);
    expect(userID).toBe(-1);
})

//checkCredentials test
test("checkCredentials returns false if username is above 30 characters", () => {
    let Username = "ThisIsAReallyLongUsernameToTestIfThereAreTooManyCharacters"
    let Password = "T4stP@ssword"
    expect(checkCredentials(Username, Password)).toBeFalsy();
})

test("checkCredentials returns true if username is valid", () => {
    let Username = "testUser"
    let Password = "T4stP@ssword"
    expect(checkCredentials(Username, Password)).toBeTruthy();
})

test("checkCredentials returns false if password does not have a special character", () => {
    let Username = "testUser"
    let Password = "T4stPassword"
    expect(checkCredentials(Username, Password)).toBeFalsy();
})

test("checkCredentials returns false if password does not have a capital letter", () => {
    let Username = "testUser"
    let Password = "t4stp@ssword"
    expect(checkCredentials(Username, Password)).toBeFalsy();
})

test("checkCredentials returns false if username has a space", () => {
    let Username = "test User"
    let Password = "T4stP@ssword"
    expect(checkCredentials(Username, Password)).toBeFalsy();
})

test("checkCredentials returns false if password has a space", () => {
    let Username = "testUser"
    let Password = "T4st P@ssword"
    expect(checkCredentials(Username, Password)).toBeFalsy();
})

//signIn tests
test("Returns true if valid user", () => {
    let Username = "testUser"
    let Password = "T4stP@ssword"
    let ValidCred = checkCredentials(Username,Password);
    let userAuthenticated = authenticate(Username, Password);
    expect(ValidCred && userAuthenticated).toBeTruthy();
})

test("Returns false if invalid user", () => {
    let Username = "Invalid Username"
    let Password = "T4stP@ssword"
    let ValidCred = checkCredentials(Username,Password);
    let userAuthenticated = authenticate(Username, Password);
    expect(ValidCred && userAuthenticated).toBeFalsy();
})

