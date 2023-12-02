require('jest');
const mongoose = require('mongoose');

const connectToUsersDb = require("../../connections/mongodb-connect-collin").connectToUsersDb;
let testConnection;

beforeAll(async () => {
    try{
        testConnection = await connectToUsersDb();
        console.log(`==============\nCollection: ${testConnection.name}`);
        console.log(`==============\nDatabase: ${testConnection.db}`);
    } catch (err){
        console.log(err.message);
        done();
    }//console.log(testConnection);
    
});

afterAll(async () => {
    mongoose.disconnect();
});

describe("connection object", () => {

    test("not a null object", () => {
        expect(testConnection).not.toBeNull();
    });


});