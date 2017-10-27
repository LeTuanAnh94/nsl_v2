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

    orderCourse:{
      collection: 'orderCourse',
      via:'student'
    },

    fid:{
      type: 'string'
    },

    gid:{
      type: 'string'
    },

    fullname:{
      type: 'string',
      size: 100
    },

    email:{
      type: 'string',
      unique: true,
      size: 45
    },

    password: {
      type: 'string',
    },

    job:{
      type: 'string',
      size: 45,
      defaultsTo: ''
    },

    description:{
      type: 'text',
      defaultsTo: ''
    },

    avatar:{
      type: 'string'
    },

    isActive:{
      type:'boolean',
      defaultsTo: false,
    }
  },
  beforeCreate: function(user, next) {
    if(!user.password){
      return next();
    }
    require('../services/bcryptPassword.js').encode(user.password, function(hash){
      user.password = hash;
      return next();
    });
  },

  beforeUpdate: function(user, next) {
    if(!user.password){
      return next();
    }
    require('../services/bcryptPassword.js').encode(user.password, function(hash){
      user.password = hash;
      return next();
    });
  }
};
