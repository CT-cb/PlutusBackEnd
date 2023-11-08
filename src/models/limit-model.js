const mongoose = require('mongoose');

const limitSchema = new mongoose.Schema({
    limitId: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    timeDivision: {
        type: String,
        required: true
    },
    maxLimit: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    }
});

const Limit = mongoose.model('Limit', limitSchema);
module.exports = Limit;

