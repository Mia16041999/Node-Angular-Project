
/**
*@author limin
*/



import mongoose from 'mongoose';

module.experts = function (done) {

  const conn = mongoose.createConnection($.config.get('bd.mongodb'));
  $.mongodb = conn;
  $.model = {};

  done();

}
