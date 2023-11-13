/**
 * The accounts route seeks to take in a JSON payload delivered to [ip addr]:3000/accounts/ and 
 * create or delete an account based on the JSON's contents.
 * 
 * We expect an incoming JSON to have the following format:
 * 
 * {
 *  "requestType":"",
 *  ""
 * }
 * 
 */


const express = require('express');
let router = express.Router();


module.exports = router;