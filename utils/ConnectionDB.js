var connections = require('./../Model/connection.js').connections
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Space_observatory_meetup', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("we are connected")
});
var connscehma=require('../Model/connection.js').connscehma
var aw;
var arrayList=require('arraylist')
var except;
var arrayList = require('arraylist')
var express = require('express');
var list = arrayList();
var getConnections = (async()=> {
    var except;
    aw= await connections.find();
    list.clear()
    list.add(aw)
    console.log("over here insode get connections",list.size())
    this.except=list;
    return list
});
console.log(except,"over")
var getConnection=( async (connectionid)=>{
    console.log(connectionid,"connod")
    awupdate=await connections.findOne({connectionid:connectionid})
    console.log(awupdate,"awupdate")
    return awupdate
})
module.exports.getConnections=getConnections;
module.exports.getConnection=getConnection;
module.exports.connections=connections;
module.exports.db=db
module.exports.mongoose=mongoose;
module.exports.connscehma=connscehma


