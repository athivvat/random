var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var confg = require('./config');

var User = new Schema({
    employeeId : Number,
    name: String,
    department: String,
    departmentId: Number,
    haveBuddy: Boolean,
    haveBudder: Boolean,
    buddy: Object,
    budder: Object
});

mongoose.model('users', User);

mongoose.connect(confg.db);