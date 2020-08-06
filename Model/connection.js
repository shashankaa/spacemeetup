var mongoose = require('mongoose');
var connscehma = new mongoose.Schema({
    owner_user_id:String,
    connectionid:Number,
    connectionname:String,
    connectiontopic:String,
    host:String,
    date:String,
    time:String,
    details:String,
    location:String,
    numppl:String
  });
  var connections = mongoose.model('connections', connscehma);
  module.exports.connscehma=connscehma;
  module.exports.connections=connections;
