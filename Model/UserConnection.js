var mongoose = require('mongoose');
var userconnschema = new mongoose.Schema({
    connectionid: Number,
    userid:String,
    rsvp:String,
    cname:[{ type:String}],
    ctopic:[{type:String}]
  });
var userconns = mongoose.model('userconns', userconnschema);
module.exports.userconnschema=userconnschema;
module.exports.userconns=userconns;