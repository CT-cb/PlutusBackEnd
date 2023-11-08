const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    incomeId: {
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
    type: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    incomeDate: {
        type: Date,
        required: true
    },
    sourceType: {
        type: String,
        required: true
    },
    source: {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String
        }
    },
    seriesId: {
        type: String
    }
});

const Income = mongoose.model('Income', incomeSchema);
module.exports = Income;
