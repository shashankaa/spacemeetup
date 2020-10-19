var arrayList = require('arraylist')
var express = require('express');
var db=require('../utils/ConnectionDB').db
var mongoose=require('../utils/ConnectionDB').mongoose
let mongooseHidden = require('mongoose-hidden')()
var bcrypt = require('bcryptjs');
var uname;
var duplicate=0;
var userid;
var Users=require('../Model/User.js').Users;
var Userschems=require('../Model/User.js').Userschems;
class UserDB { 
    constructor(userid, firstName, lastName, email,password) {
        this.userid = userid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email=email;
        this.password=password;
    }
}
  Userschems.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  Userschems.methods.validPassword = function(password1,password2) {
    return bcrypt.compareSync(password1, password2);
  };  
  let user_data=[]
  var usup= function getsignupdet(signup)
  {console.log(signup,"inside func")
        

console.log(usup,"outside func")
 user_data = [
    {
        firstName: signup.firstname,
        lastName: signup.lastname,
        email: signup.email,
        password:Userschems.methods.generateHash(signup.password) 
    }
]

return signup;
}


getAllusers = async function() {
    // await Users.deleteMany()
    var i=0;
    console.log(usup,"inside async")
        
          if(user_data[0]!==undefined)
          {
            user_data[0].firstName, 
            user_data[0].lastName, 
            user_data[0].email,
            user_data[0].password
          }
          else
          {
           return;
          }
        
        console.log(user_data[0])
         duplicate= await Users.find({email:user_data[i].email}).count()
         userid= await Users.find().count()
        console.log(duplicate)
        if(duplicate===0)
         await Users.insertMany({userid:userid,firstName:user_data[i].firstName,lastName:user_data[i].lastName,email:user_data[i].email,password:user_data[i].password})
         else 
         return duplicate;
}
async function getUser(uname){
let usid=await Users.find({email:uname},'userid -_id');
        console.log(usid[0],"usid");
        if(usid[0]!==undefined)
        {
        console.log(usid[0].userid,"us");
      return usid[0].userid;  
        }
        else
        return null;
}

async function getUserinfo(usid)
{
    console.log("usid",usid,"inside user")
let pass=await Users.find({userid:usid},'password -_id');
console.log(pass[0].password,"inside updass");
return pass[0].password;
}
async function getUsername(uids)
{
console.log("usid",uids,"inside username")
let fname=await Users.find({userid:uids},'firstName -_id');
console.log(fname[0].firstName,"inside username");
return fname[0].firstName;
}
module.exports.getUser=getUser;
module.exports.getUserinfo=getUserinfo;
module.exports.getAllusers=getAllusers;
module.exports.mongoose=mongoose;
module.exports.db=db;
module.exports.Userschems=Userschems;
module.exports.UserDB=UserDB;
module.exports.getUsername=getUsername;
module.exports.usup=usup;


