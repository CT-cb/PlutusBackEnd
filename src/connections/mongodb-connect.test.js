const { default: mongoose } = require('mongoose');
const Connector = require('./mongodb-connect-collin');
require('jest');

beforeAll(async()=>{
    await Connector.connectToMongo();
});

describe('test the connection function', ()=>{

    test('standard test',async()=>{
        let connection = await Connector.connectToMongo();

        expect(connection).not.toBe(null);
        await mongoose.disconnect();
    });
});