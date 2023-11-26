const mongoose = require('mongoose');

const PayeeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        default:"Unknown Payee"
    },
    description:{
        type:String,
        default:""
    },
    category:{
        type:String,
        default:""
    }
});

module.exports = {PayeeSchema};