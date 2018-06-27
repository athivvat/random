var express = require('express');
var router = express.Router(); 
var mongoose = require('mongoose');
var User = mongoose.model('users');
var _ = require('lodash')

router.post('/', function(req, res, next) {
  var employeeId = req.body.employeeId
  User.findOne({employeeId}, function(err, user){
    if (_.isEmpty(user)) {
      var message = 'แน่ใจนะว่าคุณเป็นพนักงาน KPC เนื่องจากเราไม่พบรหัสพนักงาน ' + employeeId
      res.render('result', { 
        title: 'โปรแกรมคุกกี้เสียงทาย',
        message
      });
    } else if (user.haveBuddy) {
      var message = 'คุณมีคู่แล้ว อย่าหลายใจ!!!'
      res.render('result', { 
        title: 'โปรแกรมคุกกี้เสียงทาย',
        message
      });
    } else {
      var query = {
        departmentId: {$ne: user.departmentId},
        haveBudder: false // ดึงเฉพาะคนที่ยังไม่มีใคร take care
      }
      User.find(query, function(err, users) {
        if (users.length == 0) {
          User.find({haveBudder: false}, function(err, users) {
            var random = Math.floor(Math.random() * users.length)
            var buddy = users[random]

            // Update Buddy
            User.update({_id: user._id}, 
              {$set: {haveBuddy: true, buddy: { _id: buddy._id, employeeId: buddy.employeeId, name: buddy.name}}}, function(err, result) {
              if (err) throw err

              // Update Budder
              User.update(
                {_id: buddy._id}, 
                {$set: {haveBudder: true, budder: {_id: user._id, employeeId: user.employeeId, name: user.name}}}, function(err, updateBudder) {

                if (err) throw err

                if (result.ok) {
                  res.render('result', { 
                    title: 'โปรแกรมคุกกี้เสียงทาย',
                    match: buddy
                  });
                }   
              })       
            })
          })
        } else {
          var random = Math.floor(Math.random() * users.length)
          var buddy = users[random]

          // Update Buddy
          User.update({_id: user._id}, 
            {$set: {haveBuddy: true, buddy: { _id: buddy._id, employeeId: buddy.employeeId, name: buddy.name}}}, function(err, result) {
            if (err) throw err

            // Update Budder
            User.update(
              {_id: buddy._id}, 
              {$set: {haveBudder: true, budder: {_id: user._id, employeeId: user.employeeId, name: user.name}}}, function(err, updateBudder) {

              if (err) throw err

              if (result.ok) {
                res.render('result', { 
                  title: 'โปรแกรมคุกกี้เสียงทาย',
                  match: buddy
                });
              }   
            })       
          })
        }
      })
    }
  });
});

module.exports = router;
