var express = require('express');
var router = express.Router(); 
var mongoose = require('mongoose');
var User = mongoose.model('users');
var _ = require('lodash')

router.post('/', function(req, res, next) {
  var employeeId = req.body.employeeId
  User.find({employeeId}, function(err, users){
    if (_.isEmpty(users)) {
      var message = 'ไม่พบข้อมูลรหัสพนักงาน ' + employeeId + ' กรุณาตรวจสอบและเสี่ยงทายอีกครั้ง'
      res.render('result', { 
        title: 'โปรแกรมคุกกี้เสียงทาย',
        message
      });
    } else {
      res.render('result', { title: 'โปรแกรมคุกกี้เสียงทาย' });
    }
  });
});

module.exports = router;
