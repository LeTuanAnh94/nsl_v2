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

    avatar:{
      type: 'string'
    },
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
