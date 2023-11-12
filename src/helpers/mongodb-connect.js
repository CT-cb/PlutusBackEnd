//Establish environment variables for connection
require('dotenv').config();
const password = process.env.MONGODB_CONNECTION_AUTH_URI;
const uri = "mongodb+srv://plutus_connect:rhhF7hYHhM35PfYm@plutuscluster0.wb9gzhs.mongodb.net/?retryWrites=true&w=majority";
// This is what the dotenv SHOULD look like: const uri = process.env.MONGODB_CONNECTION_URI;


//Make a variable to utilize mongoose (package for mongodb connections)
const mongoose = require("mongoose");
//Connect to the database using .connect
mongoose.connect(uri).catch(error => console.log(error));
//Make a variable to monitor the status of connection
const connection = mongoose.connection;


//successful case of connection
connection.once("open", () =>{
    console.log("successful database connection")
});
//handle ongoing errors 
connection.on("error", err => {
    console.log(err);
});


//establish a port connection
let port = Number("3000");
const express = require('express');
const app = express();
app.listen(port, function(req, res) {
    console.log("server is started on port " + port)
});
