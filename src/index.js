require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PLUTUS_TEST_PORT;

let router = express.Router();

//let routes = require('./routes'); //

// use statements for the different routes TODO: add more
router.use("/test", (req,res,next) => {
    res.json("The /test/ endpoint was used.");
});
//router.use("/expenses",require("./routes/expense-route"));

app.listen(PORT, () => console.log(`Server started on port ${PORT} !!!`));
app.get('/',function(req,res) {
    res.json("The API test worked.");
})

/**
 * Real script starts below
 */

let UserModel = require('./models/user-model.js').UserModel;
