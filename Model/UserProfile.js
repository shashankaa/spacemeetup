 user = require('./../Model/User.js').user
 var connectinfo = require('./../Model/UserConnection.js').getconid
 var ArrayList=require('arraylist')
 var List = new ArrayList();
 var Arr=new ArrayList();
 var session=require('../routes/profilecontroller').gotoflag;
 Userconnection = require('./../utils/ConnectionDB.js').connrsvp;
 var log = require('simple-node-logger').createSimpleFileLogger('project.log');


 
var getConnections=function(uid,cinfo)
{
    var userprofilesync={userid:uid,connectinfo:cinfo}
    return userprofilesync;
}
var addConnection=function(Connection, rsvp) 
{
List.clear()    
List.add(Connection,rsvp)
log.info(List,"In model")
return List;
}
var emptyProfile=function(Arr)
{
    Arr.clear();
    return Arr;
}
var updateConnections=function(Userconnection)
{
    return Userconnection.rsvp;
}
var removeconnection=function (Userconnection) 
{console.log(Userconnection,"List",List)
  return Userconnection.connectinfo.connectionid
}

module.exports.getConnections=getConnections;
module.exports.addConnection=addConnection;
module.exports.emptyProfile=emptyProfile;
module.exports.updateConnections=updateConnections;
module.exports.removeconnection=removeconnection;
