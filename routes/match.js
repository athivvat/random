var express = require('express');
var router = express.Router(); 
var mongoose = require('mongoose');
var User = mongoose.model('users');

router.get('/', function(req, res, next) {
    res.render('match', { title: 'โปรแกรมคุกกี้เสียงทาย' });
  });
  
  module.exports = router;