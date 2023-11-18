const mongoose = require('mongoose');
require('dotenv').config();


//const AUTH_PW = process.env.MONGODB_CONNECTION_AUTH_PW;

/**
 * 
 * @returns the mongoose.connection object
 */
async function connectToMongo(){
    const URI = process.env.MONGODB_CONNECTION_URI_BASIC;
    await mongoose.connect(URI);
    let connected = false;
    
    mongoose.connection.on('connected', function (ref) {
        connected=true;
        //console.log(mongoose.connection.models);
        //console.log('connected to mongo server.');
    });
    
    mongoose.connection.on('error', function (err) {
        connected=false;
        //console.log('error connection to mongo server!');
        //console.log(err);
    });

    return mongoose.connection;
}

async function connectToUsersDb(){
    const USERSDB_URI = process.env.MONGODB_CONNECTION_URI_USERSDB;
    await mongoose.connect(USERSDB_URI);
    let connected = false;
    
    mongoose.connection.on('connected', function (ref) {
        connected=true;
        //console.log(mongoose.connection.models);
        //console.log('connected to mongo server.');
    });
    
    mongoose.connection.on('error', function (err) {
        connected=false;
        //console.log('error connection to mongo server!');
        //console.log(err);
    });

    return mongoose.connection
}
async function disconnectFromMongo(){
    //console.log("now disconnecting");
    mongoose.disconnect();
    
    mongoose.connection.on('disconnected', () =>{
        console.log("Disconnected from the mongo server.");
    })
}

module.exports = {connectToMongo, disconnectFromMongo, connectToUsersDb};
