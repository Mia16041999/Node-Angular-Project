
/**
*@author limin
*/


import mongoose from 'mongoose';

module.experts = function (done) {

  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const BlogPost = new Schema({
    name: {type: String, unique: true},
    password:{type: String},
    nickname:{type: String}
  })
  $.mongodb.model('User',User);
  $.model.User = $.mongodb.model('User');

done();


}
