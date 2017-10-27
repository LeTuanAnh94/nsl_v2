/**
 * Created by TuanAnh on 10/21/2017.
 */
module.exports = {

  attributes: {
    id:{
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    course:{
      model:'course'
    },
    student:{
      model: 'student'
    },
    cost:{
      type: 'integer'
    },
    status:{
      type:'boolean',
      defaultsTo: false
    },
    note:{
      type:'string',
    },
    lastTrace:{
      type:'string',
      defaultsTo: '0-0'
    },
    datePay:{
      type:'datetime'
    }
  }
};

