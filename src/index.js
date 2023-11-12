require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;

let router = express.Router;

app.listen(PORT, () => console.log(`Server started on port ${PORT} !!!`));
app.get('/',function(req,res) {
    res.json("The API test worked.");
})

/**
 * Real script starts below
 */

let UserModel = require('user-model.js').UserModel;