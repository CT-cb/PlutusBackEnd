const mongoose = require('mongoose');
const uuid = require('uuid'); // use v4
const ExpenseSchema = new mongoose.Schema({
    expenseId: {
        type: String,
        default: uuid.v4(),
        immutable: true,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    amount:{
        type: Number,
        // TODO: add validation to ensure it's >= 0
        required: true
    },
    method:{
        type:String,
        required:true
    },
    currency:{
        type:String,
        required:true,
        default: "usd"
    },
    expenseDate:{
        type:Date,
        required:true,
        default:Date.now()
    },
    payee:{
        type:payeeSchema,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
        immutable: true
    }
});

ExpenseSchema.statics.CreateExpense = function(
    userEmail,
    amount,
    expenseDate,
    method,
    currency,
    payee,
    seriesId = null
){
    const newSchema = new ExpenseSchema();

    newSchema.expenseId = uuid.v4();
    while (this.find({expenseId: newSchema.expenseId})){
        newSchema.expenseId = uuid.v4();
    }
    newSchema.user = userEmail;
    newSchema.amount = amount;
    newSchema.method = method;
    newSchema.xpenseDate = expenseDate;
    newSchema.currency = currency;
};

const ExpenseModel = mongoose.model('expenses',ExpenseSchema);

module.exports = ExpenseModel;