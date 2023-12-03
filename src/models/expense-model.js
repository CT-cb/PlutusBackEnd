const mongoose = require('mongoose');
const uuid = require('uuid'); // use v4
const PayeeSchema = require("./payee-schema");
const GlobalHelpers = require('../helpers/global-helpers');
const ExpenseSchema = new mongoose.Schema({
    expenseId: {
        type: String,
        default: uuid.v4,
        immutable: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        validate:{
            validator: function(email) {
                return GlobalHelpers.isValidEmail(email);
            },
            message: bad => `${bad} is not a valid email!`
        }
    },
    amount: {
        type: Number,
        // TODO: add validation to ensure it's >= 0
        required: true
    },
    method: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true,
        default: "usd"
    },
    expenseDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    payee: {
        type: PayeeSchema,
        required: false
    },
    type:{
        type:String,
        required:false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
        immutable: true
    }
});

/*ExpenseSchema.static.ReplaceUuid = function (oldExpense) {
    let newSchema = new ExpenseSchema(
        email = oldExpense.email,
        amount = oldExpense.amount,
        method = oldExpense.method,
        currency = oldExpense.currency,
        expenseDate = oldExpense.expenseDate,
        payee = oldExpense.payee,
        type = oldExpense.type
    )

    return newSchema;
}*/

const ExpenseModel = mongoose.model('expenses', ExpenseSchema);

module.exports = ExpenseModel;