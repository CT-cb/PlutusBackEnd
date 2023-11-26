const mongoose = require('mongoose');
const uuid = require('uuid'); // use v4

const LimitSchema = new mongoose.Schema({
    limitId: {
        type: String,
        default: uuid.v4(),
        required: true,
        immutable: true,
        unique: true
    },
    user: {
        type: String,
        required: true,
        immutable: true // think about it: why would a limit ever need to switch to another user?
    },
    startDate: {
        type: Date,
        default: Date.now(),
        required: false
    },
    endDate: {
        type: Date,
        default: new Date("3000-01-01"),
        required: true
    },
    timeDivision: {
        type: String,
        default: "week",
        required: true,
        validate:{
            validator: function(td){
                return /(weekly|week|daily|day|monthly|month|yearly|year|annually|annual)/.test(td);
            },
            message: props => `${props.value} is not a valid time division!`
        }
    },
    maxLimit:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true,
        default: "usd"
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        required:true,
        immutable:true
    }
});

const LimitModel = mongoose.model('limits', LimitSchema);

module.exports = {
    LimitModel
};
