require('dotenv').config();

const express = require('express');
const app = express();
//const PORT = process.env.PLUTUS_API_PORT;
const PORT = process.env.PLUTUS_TEST_PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT} !!!`));
app.get('/',function(req,res) {
    res.json("The API test worked.");
})

const userRouter = require('./routes/user-route.js'); 
app.use('/users', userRouter); //