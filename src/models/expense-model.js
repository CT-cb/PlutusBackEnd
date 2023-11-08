const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    transId: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    transDate: {
        type: Date,
        required: true
    },
    sourceType: {
        type: String,
        required: true
    },
    payee: {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        category: {
            type: String
        }
    },
    seriesId: {
        type: String
    }
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
