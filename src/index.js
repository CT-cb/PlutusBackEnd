require('dotenv').config();
const PORT = process.env.PLUTUS_TEST_PORT;
const cors = require('cors');
const express = require('express');
const app = express();


// MongoDB connection - I wrote one here just for testing purposes (Mason's is in the second line)
// Feel free to uncomment Mason's and comment mine out once the former is working
const connectToMongo = require('./connections/mongodb-connect-collin').connectToMongo;
let mongo_connection = connectToMongo();
//let connect = require('./helpers/mongodb-connect.js');

/**
 * Middleware functions for request validation/parsing, I guess
 * Ideally we'd want more valdiations for CORS and stuff like that
 */
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Mount the router vvv
app.use('/',require('./routes'));

// Listen on the port
app.listen(PORT, () => console.log(`Server started on port ${PORT} !!!`));
app.get('/',function(req,res) {
    res.json("The API test worked.");
});

app.use(function(error, req,res,next){
    // error handler
    res.status(error.status || 500);
    res.json({
        "status":"error",
        "error_type":error.errorType,
        "message":error.message
    });
})