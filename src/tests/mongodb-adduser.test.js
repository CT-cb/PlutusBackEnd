require('jest');
jest.setTimeout(10000);

const mongoose = require('mongoose');
mongoose.set()

const connectToMongoDb = require("../connections/mongodb-connect-collin").connectToMongo;
const UserModel = require('../models/user-model');
const DBNAME = "usersdb";

let badEmail = "plutustestname";
let goodEmail = "plutustestname@plutus.com"
let pwd = "abc123"

let connection;
let db;

/* beforeAll(async () => {
    connection = await connectToMongoDb().catch((err) => {
        console.log(err);
    });
    //onsole.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!stopped");

    //console.log(connection);
    //db = await connection.db(DBNAME);
});

beforeAll(async () => {
    let existingUser = await UserModel.findUser(goodEmail,pwd).catch((err) => {
        console.log(err);
    });
    if (existingUser){
        await existingUser.deleteOne();
    }
        
});


test("user shouldn't already exist", async () => {
    let result = null;
    try {
        result = await UserModel.findUser(badEmail, pwd);
        console.log(`=====RESULT:\n${result}\n======`);
    } catch (err) {
        console.log(err.message);
        done();
    }

    expect(result).toBeNull();
});

test("make a new user", async () => {
    let newUser = new UserModel({ email: goodEmail, password: pwd });
    let result = await newUser.save();
    expect(result).not.toBeNull();
});

test.failing("make a duplicate of the user", async () => {
    let newUser = new UserModel({ email: goodEmail, password: pwd });
    let result = await newUser.save();
    expect(result).not.toBeNull();
})

test("user created and found in db", async () => {
    let user = null;
    try {
        user = UserModel.findUser(goodEmail, pwd);
    } catch (err) {
        console.log(err.message);
        done();
    }
    expect(user).not.toBeNull();
});

afterAll(async () => {
    await connection.close();
    //one();
}); */

describe("add user to db tests",()=>{
    
    beforeAll(async () => {
        connection = await connectToMongoDb().catch((err) => {
            console.log(err);
        });
        //onsole.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!stopped");
    
        //console.log(connection);
        //db = await connection.db(DBNAME);
    });
    
    beforeAll(async () => {
        let existingUser = await UserModel.findUser(goodEmail,pwd).catch((err) => {
            console.log(err);
        });
        if (existingUser){
            await existingUser.deleteOne();
        }
            
    });

    afterAll(async () => {
        await connection.close();
        //one();
    });

    it("user shouldn't already exist", async () => {
        let result = null;
        try {
            result = await UserModel.findUser(badEmail, pwd);
            console.log(`=====RESULT:\n${result}\n======`);
        } catch (err) {
            console.log(err.message);
            //done();
        }
    
        return expect(result).toBeNull();
    });
    
    test("make a new user", async () => {
        let newUser = new UserModel({ email: goodEmail, password: pwd });
        let result = await newUser.save();
        return expect(result).not.toBeNull();
    });
    
    test.failing("make a duplicate of the user", async () => {
        let newUser = new UserModel({ email: goodEmail, password: pwd });
        let result = await newUser.save();
        return expect(result).not.toBeNull();
    })
    
    test("user created and found in db", async () => {
        let user = null;
        try {
            user = await UserModel.findUser(goodEmail, pwd);
        } catch (err) {
            console.log(err.message);
            done();
        }
        return expect(user).not.toBeNull();
    });
})