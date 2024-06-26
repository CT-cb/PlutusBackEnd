const mongoose = require('mongoose');
const uuid = require('uuid'); // use v4
const GlobalHelpers = require('../helpers/global-helpers');

const LimitSchema = new mongoose.Schema({
    limitId: {
        type: String,
        default: uuid.v4,
        required: true,
        immutable: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        immutable: true, // think about it: why would a limit ever need to switch to another user?
        validate:{
            validator: function(email) {
                return GlobalHelpers.isValidEmail(email);
            },
            message: bad => `${bad} is not a valid email!`
        }
    },
    startDate: {
        type: Date,
        default: Date.now(),
        required: true
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

/*LimitSchema.static.ReplaceUuid = function (oldLimit) {
    let newSchema = new LimitSchema(
        email = oldLimit.email,
        startDate = oldLimit.startDate,
        endDate = oldLimit.endDate,
        timeDivision = oldLimit.timeDivision,
        maxLimit = oldLimit.maxLimit,
        currency = oldLimit.currency,
        createdAt = oldLimit.createdAt,
        limitId = oldLimit.limitId
    )

    return newSchema;
}*/
const LimitModel = mongoose.model('limits', LimitSchema);

module.exports = LimitModel;