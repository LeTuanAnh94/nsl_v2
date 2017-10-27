var mysql ={
  selectTeacherHasMostCourse: function (number) {
    var query = 'SELECT c.teacher,u.fullname,(select count(*) from nsl_v2.course where nsl_v2.course.teacher = c.teacher and nsl_v2.course.status ="active") as total ' +
      'FROM nsl_v2.course as c, mall.teacher as u ' +
      'WHERE c.teacher = u.id ' +
      'GROUP BY c.teacher ' +
      'ORDER BY total DESC ' +
      'LIMIT '+ number;


    var db = sails.config.connections.someMysqlServer.database;
    String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.replace(new RegExp(search, 'g'), replacement);
    };
    query = query.replaceAll('nsl_v2',db);
    return query;

  }
}

module.exports = mysql
