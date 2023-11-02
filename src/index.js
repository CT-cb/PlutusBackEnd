require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT} !!!`));
app.get('/',function(req,res) {
    res.json("The API test worked.");
})