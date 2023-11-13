/** 
 * Route for testing purposes.
 * 
 * Uses [ip addr]:3000/tests/
 */

const express = require('express');
require('dotenv').config();

// Router object to further route a request based on elements of the address that follow the /test/ substring.
let router = express.Router();

/**
 * Middlewares
 */


/**
 * This section of code handles GET requests made to [ip addr]:3000/test/
 * 
 * I wrote this to correspond to the plutus-bland
 */
router.get("/", (req,res) => {
    let obj = JSON.parse(req.body);
    let text = obj["testText"]
    res.json(text);
});

/**
 * Example: Define a route for [ip addr]:3000/test/1 to test a function. Here I'm just telling the response to be a JSON
 * with the text "You entered /1" in it.
 */
router.get("/1", (req,res) => {
    res.json("You entered /1.\n");
});

