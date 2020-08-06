var mongoose = require('mongoose');
var Userschems = new mongoose.Schema({
    userid: String,
    firstName: String,
    lastName: String,
    email: String,
    password:{type:String}
  });
  var Users = mongoose.model('Users', Userschems);
  module.exports.Userschems=Userschems;
  module.exports.Users=Users;



