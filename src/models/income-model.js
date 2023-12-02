const mongoose = require('mongoose');
const uuid = require('uuid'); // use v4
const PayeeSchema = require("./payee-schema");
const IncomeSchema = new mongoose.Schema({
    incomeId: {
        type: String,
        default: uuid.v4(),
        immutable: true,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        // TODO: add validation to ensure it's >= 0
        required: true
    },
    currency: {
        type: String,
        required: true,
        default: "usd"
    },
    incomeDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    source: {
        type: mongoose.Schema({
            name: String,
            description: String
        }),
        required:false
    },
    type:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
        immutable: true
    }
});

IncomeSchema.static.ReplaceUuid = function (oldIncome) {
    let newSchema = new IncomeSchema(
        email = oldIncome.email,
        amount = oldIncome.amount,
        currency = oldIncome.currency,
        incomeDate = oldIncome.incomeDate,
        source = oldIncome.source,
        type = oldIncome.type
    )

    return newSchema;
}

const IncomeModel = mongoose.model('incomes', IncomeSchema);

module.exports = IncomeModel;