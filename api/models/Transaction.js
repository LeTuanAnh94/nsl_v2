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
    teacher:{
      model:'teacher'
    },
    reqMoney:{
      type:'integer'
    },
    status:{
      type:'boolean',
      defaultsTo: false
    },
    note:{
      type:'text',
      defaultsTo: ''
    }
  }
};
