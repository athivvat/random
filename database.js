var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var confg = require('./config');

var User = new Schema({
    employeeId : Number,
    firstname: String,
    lastname: String,
    nickname: String,
    departmetn: String
});

mongoose.model('users', User);

mongoose.connect(confg.db);