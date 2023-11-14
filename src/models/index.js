const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let db = {}

db.mongoose = mongoose;
db.user = require('./user-model');
//db.expense = require('./expense-model');
//db.income = require('./income-model');
//db.limit = require('./limit-model');

module.export = db;