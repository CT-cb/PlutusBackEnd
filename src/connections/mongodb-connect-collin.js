const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGODB_CONNECTION_URI;
//const AUTH_PW = process.env.MONGODB_CONNECTION_AUTH_PW;

async function connectToMongo(){
    mongoose.connect(URI);
    let connected = false;
    
    mongoose.connection.on('connected', function (ref) {
        connected=true;
        console.log(mongoose.connection.models);
        console.log('connected to mongo server.');
    });
    
    mongoose.connection.on('error', function (err) {
        connected=false;
        console.log('error connection to mongo server!');
        console.log(err);
    });

    return connected;
}

async function disconnectFromMongo(){
    console.log("now disconnecting");
    mongoose.disconnect();
    
    mongoose.connection.on('disconnected', () =>{
        console.log("Disconnected from the mongo server.");
    })
}

async function main(){
    await connectToMongo();
}

main();