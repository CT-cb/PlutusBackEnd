//Establish environment variables for connection
const dotenv = require('dotenv');
const password = process.env.MONGODB_CONNECTION_AUTH_URI;
const uri = process.env.MONGODB_CONNECTION_URI;


//Make a variable to utilize mongoose (package for mongodb connections)
const mongoose = require("mongoose");
//Connect to the database using .connect
//mongoose.connect("mongodb://(ip#):(port#)/(database name)");
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex:true})
    //handle initial errors
    .catch(error => handleError(error));
//Make a variable to monitor the status of connection
const connection = mongoose.connection;


//successful case of connection
connection.once("open", () =>{
    console.log("successful database connection")
});

//establish a port connection
let port = Number("3000");
var app = express();
app.listen(port, function(req, res) {
    console.log("server is started on port " + port)
});

//handle ongoing errors 
connection.on("error", err => {
    console.log(err);
});
