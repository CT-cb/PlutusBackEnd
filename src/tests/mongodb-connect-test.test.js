const { mongo } = require('mongoose');
const mongoose = require('mongoose');
require('jest');
const mongodbConnectTest = require('../connections/mongodb-connect-collin').connectToMongo;
let testConnection;

beforeAll(async () => {
    try {testConnection = await mongodbConnectTest();
    } catch (err){
        console.log(err.message);
    }
    //console.log(testConnection);
    console.log(`==============\nCollection: ${testConnection.name}`);
    console.log(`==============\nDatabase: ${testConnection.db}`);
});

afterAll(async () => {
    mongoose.disconnect();
});

describe("connection object", () => {

    test("not a null object", () => {
        expect(testConnection).not.toBeNull();
    });


});