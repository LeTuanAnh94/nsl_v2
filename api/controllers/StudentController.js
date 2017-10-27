/**
 * Created by TuanAnh on 10/24/2017.
 */
var verify =  sails.config.verify;

module.exports = {

  registerStudent: function (req, res) {
    var newStudent = {
      email: req.body.email.trim(),
      fullname: req.body.fullname.trim(),
      password: req.body.password.trim(),
      avatar:'/images/avatar-default.png'
    };
    Student.find({
      email: req.body.email.trim()
    }).then(function (students) {
      if(students.length != 0 && students[0].isActive){
        return res.json({message:'email_exist'})
      }
      if(!students.length){
        Student.create(newStudent).then(function(student){
          require('../services/verifyEmail.js').sendVerify(student,verify.student_link, function(err){
            if(err){
              return res.json({message:'error'});
            }else{
              return res.json({message:'success'})
            }
          });
        });
      }else{
        Student.update({id:students[0].id},newStudent).then(function(student){
          require('../services/verifyEmail.js').sendVerify(student[0],verify.student_link, function(err){
            if(err){
              return res.json({message:'error'});
            }else{
              return res.json({message:'success'})
            }
          });
        });
      }

    });
  },

  verifyStudent: function(req, res){
    if(!req.query) return res.notFound();
    if(!req.query.verifycode) return res.notFound();
    require('../services/verifyEmail.js').verifyCode(req.query.verifycode, function(id){
      if(!id) return res.notFound();
      Student.find({
        id: parseInt(id)
      }).then(function (students) {
        if(students.length != 0){
          if(students[0].isActive) return res.notFound();
          Student.update({
            id: parseInt(id)
          },{
            isActive: true
          }).then(function(student){
            return res.view('index/verifyUser.ejs');
          }).catch(function(err){
            return res.badRequest(err);
          });
        }else{
          return res.notFound();
        }
      })

    });
  },









}
