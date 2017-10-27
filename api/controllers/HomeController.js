var fs = require('fs');
var request = require('request');

var checkRole = require('../services/checkRole.js').check;
var query = require('../services/query.js');
module.exports ={
  index: function(req, res) {
    var data = {};
    data.queryStr = {}
    var pagging = {
      current:0,
      count:0,
      limit:6,
    }
    var where = {status:'active'};
    if((isNaN(req.query.page) && req.query.page) || parseInt(req.query.page) <= 0 || (isNaN(req.query.teacher) && req.query.teacher) || (isNaN(req.query.category) && req.query.category) || (isNaN(req.query.level) && req.query.level)){
      return res.notFound()
    }
    if(req.query.page){
      pagging.current = parseInt(req.query.page)-1;
    }
    if(req.query.category){
      where.categoryId = parseInt(req.query.category);
      data.queryStr.category = where.categoryId;
    }
    if(req.query.level){
      where.levelId = parseInt(req.query.level);
      data.queryStr.level = where.levelId;
    }
    if(req.query.teacher){
      where.teacher = parseInt(req.query.teacher);
      data.queryStr.teacher = where.teacher;
    }
    if(req.query.coursename){
      where.name = {'contains':req.query.coursename};
      data.queryStr.searchCourseName = req.query.coursename
    }
    var getCategory = function(){
      return new Promise(function(fullfill, reject){
        Category.find({}).populate('course',{status:'active'}).exec(function(err, _category){
          data.categories = _category;
          return fullfill()
        })
      });
    }
    var getLevel = function(){
      return new Promise(function(fullfill, reject){
        Level.find({}).populate('course',{status:'active'}).exec(function(err, _levels){
          data.levels = _levels;
          return fullfill()
        })
      });
    }
    var getTopTeacher = function(){
      return new Promise(function(fullfill, reject){
        Course.query(query.selectTeacherHasMostCourse(5),[], function(err, list){
          data.topTeachers = list;
          return fullfill();
        })
      });
    }
    var listCourse = function(){
      return new Promise(function(fullfill, reject){
        Course.count(where).exec(function(err, count){
          pagging.count = count;
          if(pagging.current >= Math.ceil(count/pagging.limit) && pagging.current!=0){
            return reject()
          }
          Course.find({
            // select:['id','name'],
            where:where,
            skip: pagging.limit * pagging.current,
            limit: pagging.limit,
            sort:'createdAt DESC'
          }).populate('teacher').exec(function(err, list){
            if(err) return reject(err);
            data.listCourses = list;
            data.pagging = pagging;
            return fullfill();
          })
        })

      });
    }
    getCategory().then(getLevel).then(getTopTeacher).then(listCourse).then(function(){
      data.user = req.user;
      res.view('index/homepage.ejs', data);
    }).catch(function(err){
      console.log(err)
      res.notFound();
    })
  },


///////////////// TEACHER///////////////////////////////////
  loginTeacher: function(req, res){
    res.view('teacher/login.ejs');
  },


}
