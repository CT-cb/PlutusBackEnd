//Establish environment variables for connection
const dotenv = require('dotenv');
const password = process.env.MONGODB_CONNECTION_AUTH_URI;
const uri = process.env.MONGODB_CONNECTION_URI;


//Make a variable to utilize mongoose (package for mongodb connections)
const mongoose = require("mongoose");
//Connect to the database using .connect
mongoose.connect(uri, 
    {
        useNewUrlParser:true, 
        useUnifiedTopology:true
    }
);
//Make a variable to monitor the status of connection
const connection = mongoose.connection;


//successful case of connection
connection.once("open", () =>{
    console.log("Successful database connection!")
});
//handle ongoing errors 
connection.on("error", err => {
    console.log(err);
});


//establish a port connection...