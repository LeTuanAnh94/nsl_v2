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
    lessonId:{
      model:'lesson'
    },

    answer:{
      collection: 'answer',
      via:'questionId'
    },

    content:{
      type: 'string',
      size: 256
    }
  },
  afterDestroy: function(destroyedRecords, cb) {
      function dequy(list, i){
        if(i >= list.length){
          return cb();
        }
        Answer.destroy({
          questionId: list[i].id
        }).exec(function(err){
          dequy(list, ++i);
        });
      }
      dequy(destroyedRecords,0);
  }
};
