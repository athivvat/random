var express = require('express');
var router = express.Router(); 
var mongoose = require('mongoose');
var User = mongoose.model('users');

router.post('/', function(req, res, next) {
  console.log(req.body.employeeId)
  User.find(function(err, users){
    console.log(users)
    res.render('result', { title: 'โปรแกรมคุกกี้เสียงทาย' });
  });
});

module.exports = router;
