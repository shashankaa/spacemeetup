
var express=require('express');
var app=express();
var apps=express()
app.set("trust proxy", true); // trust first proxy
app.use('/assets',express.static('assets'));
var fs=require('fs')
fs.writeFile('project.log','',function()
{})
var profilecontroller = require('./routes/profilecontroller.js'); 
console.log("we are here")
app.use(profilecontroller)
var stringtosee="2:00AM to 3:00PM" 
var sto=stringtosee.split(' ');
console.log(process.env.PORT);
app.listen(process.env.PORT||8080);

