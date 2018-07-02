var express = require('express');
var router = express.Router(); 
var mongoose = require('mongoose');
var User = mongoose.model('users');
var _ = require('lodash')

router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
    console.log(users)
    res.render('match', { 
      title: 'โปรแกรมคุกกี้เสียงทาย',
      users
    });
  })
  });
  
  module.exports = router;