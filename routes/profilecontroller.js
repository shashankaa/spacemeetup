var express = require('express')
var router = express.Router();
var getConnections = require('../utils/ConnectionDB').getConnections
var getconid = require('../utils/ConnectionDB').getConnection
var bodyParser=require('body-parser')
var session=require('express-session')

router.use(
	session({
      name: "Session",
		resave: false,
		saveUninitialized: true,
		secret: "mysession",
		cookie: {
			maxAge: 1000 * 60 * 60,
			sameSite: false,
			secure: false
		}
	})
);
// router.use(session({secret:'mysession'}));
var ArrayList=require('arraylist')
var arraylist=require('arraylist')
var i=undefined;
var arraylist=arraylist();
var result= ArrayList();
var value;
var db=require('../utils/UserDB').db;
var log = require('simple-node-logger').createSimpleFileLogger('project.log');
var Listconn = ArrayList();
var List = ArrayList();
var uname=require('../utils/UserDB').uname
var db=require('../utils/ConnectionDB').db
var UserConnectionDB=require('../utils/UserConnectionDB').UserConnectionDB;
var guser=require('../utils/UserDB.js').getAllusers;
var guserid=require('../utils/UserDB.js').getUser;
var id;
var rsvp;
var userid;
var Userschems=require('../utils/UserDB').Userschems;
var getUserinfo=require('../utils/UserDB').getUserinfo;
var getUsername=require('../utils/UserDB').getUsername;
var uids;
var usup=require('../utils/UserDB').usup;
   router.get('/connections.ejs',function (req, res) {  
      log.info(
       session,"did you see")
         log.info(value,"value")
         log.info("final session results",req.session)
         var except=async()=>{
          result=await(getConnections())
         //req.session.i=i;
      if (req.session.userid===undefined)
      {
         console.log("here i come")
      res.render('connections.ejs', { func: result,the:undefined,j:arraylist})
      }
      else{
         res.render('connections.ejs', { func: result,the:req.session.userid,j:arraylist})
      }
   };
   except().then(function(result){  
   })
      log.info(req.session.Listconn,"in connections")
   });
   router.get('/index.ejs', function (req, res) {
      if(req.session.userid===undefined)
      res.render({the:undefined});
      else
      res.render({the:req.session.userid});
   });
router.get('/about.ejs', function (req, res) {
   console.log(req.session,"inside about")
   res.render('about.ejs',{the:req.session.i})
});

router.get('/contact.ejs', function (req, res) {
   res.render('contact.ejs',{the:req.session.i})
});
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.get('/login.ejs',function (req, res) {
   req.session.userid=undefined
   console.log(req.session,"here is judgement");
      res.render("login.ejs",{message:undefined,the:req.session.userid})
});

router.get('/signup.ejs',function(req,res){
   res.render('signup.ejs',{the:req.session.userid,message:undefined,duplicate:0});
})
var expressValidator = require('express-validator');
router.use(expressValidator());
router.post('/signup.ejs',urlencodedParser,function(req,res){
console.log(req.body.firstname);
var usersignup={
   firstname:req.body.firstname,
   lastname:req.body.lastname,
   email:req.body.email,
   password:req.body.psw
}
// var usup=getsignupdet(usersignup);
var firstName = req.body.firstname;
console.log(firstName,"validation")
req.check('firstname').isLength({min:3,max:20}).withMessage('FIRSTNAME Must be within 3 to 20 characters')
.isAlpha().withMessage('firstname Must contain alphabets only');
// req.check('lastname').isLength({min:3,max:20}).withMessage('FIRSTNAME Must be within 3 to 20 characters')
// .isAlpha().withMessage('firstname Must contain alphabets only');
// req.check('psw').isLength({min:3,max:20}).withMessage('FIRSTNAME Must be within 3 to 20 characters')
// .isAlpha().withMessage('firstname Must contain alphabets only');
var errors = req.validationErrors();
if(errors){
console.log("The following are the errors: ");
for(var i = 0; i < errors.length; i++){   
console.log(JSON.stringify(errors[i].msg));
var errmess="invalid username"
}
res.render('signup.ejs',{the:req.session.userid,signup:usup,message:errmess,duplicate:0});
}
else
{
console.log(usersignup,"over here")
var userdet=usup(usersignup);
getAllusers().then(function(retduplicate){
   res.render('signup.ejs',{the:req.session.userid,signup:usup,message:errmess,duplicate:retduplicate});
})
}
})
router.post('/index.ejs', urlencodedParser,function (req, res) {
   var noofusers=0;
   var p;
   var results;
   var printsome=Userschems.methods.generateHash('sh@123')
   var bcrypt = require('bcryptjs');
   guser().then( async function()
   {
      noofusers= await db.collection('users').find({email:req.body.email}).count()
      req.session.email=req.body.email;
      guserid(req.session.email).then(async function(usid){  
         console.log(req.body.email,"patch 2020");
         console.log(req.body.session,"patch 2020sessions");
          uids=usid;
         if(noofusers==0)
         {
         var message="username or password is incorrect";
         // console.log(message)
         res.render("login.ejs",{message:message,the:undefined})
         }
         else
         { 
           getUserinfo(usid).then(function(usid){
               results=Userschems.methods.validPassword(req.body.psw,usid);    
               // console.log(results,"pass here")
               if(results===false)
               {
                   message="username or password is incorrect";
                   res.render("login.ejs",{message:message,the:undefined})
               }
               else{
               i=0;
               req.session.userid=uids;
               userid=req.session.userid;
               console.log(req.session,"patch 2020sessions"); 
               // console.log("userid inside controller",userid)
               getUsername(userid).then(function(name)
               {
                  uname=name;
                  // console.log(uname,"unames")
               })
               res.render('index.ejs',{the:req.session.userid,message:message})
               }
            });
   }
   })

});
});
router.get('/', function (req, res) {
log.info(Listconn,"ilkapp")
log.info(Listconn);
//log.info(req.session.Listconn,"hereseepls")
// console.log(req.query.the,"the")
var check=req.session.userid
// console.log(check==1,check===undefined)
if(check===undefined)
{
// console.log("inside session attributes",i)
res.render("index.ejs",{message:"message",the:undefined})
}
if(check!==undefined)
{
   // console.log("inside session attributes")
   console.log(session);
}
  log.info(session,"destroy")
// console.log(req.session.i,"this is i")
      res.render('index.ejs',{the:req.session.userid})

})
router.get('/saved_connections.ejs', function (req, res,next) {
   var uid;
   // console.log("inside get")
   // if(req.query.the!==undefined)
   // {
   // req.session.i=req.query.the
   // i=req.session.i
   // }
    i=req.session.userid;
    console.log(req.session.i,"get2020 saved connections");
   // console.log("INSIDE ROUTER",i)
      log.info(req.session.Listconn,"Listconn much before")
      if(i!==undefined)
      {
         getconid(value).then(function(value){ 
            // console.log(value,"inside my workspace over here way deep in the pit")
            new UserConnectionDB().userprofile(i).then(function(something){
            // console.log(something,"somewhere")
            List.add(something)
            // console.log(uname,"controller")
            res.render('saved_connections.ejs',{the:req.session.userid,List:List,username:req.session.email})
            return List;
         })
      })
      }
      else
      res.render("login.ejs",{message:"please login",the:undefined})
   });
router.post('/saved_connections.ejs',urlencodedParser, function (req, res,next) {
   var uid;
// if(req.query.the!==undefined)
// {
// req.session.i=req.query.the
// i=req.session.i
// console.log(req.session.i,"2020 saved connections");
// }
 i=req.session.userid;
// console.log("INSIDE ROUTER",i)
   log.info(req.session.Listconn,"Listconn much before")
  
   if(i!==undefined)      
      {
         log.info("usercheck",userid)
      i=0
     
      // console.log(req.session.Listconn,"query here pls")
      log.info(req.session.uconn,"Listconn",Listconn.size())
      console.log(req.session.userid,"yoyoyoyoyoyoy");
      if(id!==null&&id!==undefined&&req.session.userid!==undefined)
      value=id.connectionid;
      if(req.session.userid!==undefined)
      {
       if(req.body.YES)
       rsvp=req.body.YES;
       else if(req.body.MAYBE)
       rsvp=req.body.MAYBE;
       else 
       rsvp=req.body.NO;
      }
       console.log("value here inside profile",value,rsvp)
     log.info(userid,"here userid is this")
    cid=req.body.delete;
// console.log("value here is",value)
   var myrsvp=req.query.myrsvp
log.info(userid,"befire call")
new UserConnectionDB().deleteconn(req.body.delete,userid);
new UserConnectionDB().addRSVP(value,req.session.userid,rsvp).then(function(){ 
     
      
  getconid(value).then(function(value){ 
      // console.log(value,"inside my workspace over here way deep in the pit")
    log.info(userid,"here is inside very")
    new UserConnectionDB().userprofile(req.session.userid).then(function(something){
       console.log(something,"somewhere")
      List.add(something)
// console.log(uname,"controller")
   res.render('saved_connections.ejs',{the:req.session.userid,List:List,username:req.session.email})
   })
})
})
      }
      else
      {
         res.render('login.ejs',{the:undefined,message:"please login to continue"})
      }
   })

router.get('/connection.ejs', function (req, res) {
    cid=req.query.connection  
   //  console.log(cid,"cid");
    getconid(cid).then(function(connid){ 
      // console.log(cid,"insode my workspace over here way deep") 
      id=connid;
      // console.log(id,"id inside connections")
      if(id===null)
      {
         res.send("error:please check whether the connection you are adding or deleting is present in the connections page");
      }
      log.info(req.query.connection,"illi")
       req.session.i=i
       console.log("inside connecton ",req.session.userid )
      res.render('connection.ejs', { ids: id,the:req.session.userid })
      log.info(req.session.Userid,"inside connection.ejs")
   })

})
var delusercreconn;
router.post('/connections.ejs',urlencodedParser,function(req,res){
    delusercreconn=req.body.DELETECONNECTION;
   console.log(delusercreconn,"here delete in post")
   console.log("List is here",result)
   new UserConnectionDB().deletecreatedconn(delusercreconn).then(function(){
      getConnections().then(function(result){
   console.log(result,"here delete in after")
   res.render('connections.ejs', { func: result,the:req.session.userid,j:arraylist})
})
   })
})

router.get('/newconnection.ejs', function (req, res) {
   console.log("req.session.userid",req.session.userid);
   if(req.session.userid===undefined)
   res.render('login.ejs',{the:req.session.userid,message:"not logged in"})
   req.session.i=0;
   req.body=req.query;
   // console.log(req.query,"query")
   res.render('newconnection.ejs',{the:req.session.userid,qs:req.query,List:undefined})
})
router.use(bodyParser.urlencoded({ 
   extended: false
})); 
var fields;
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.post('/newconnection.ejs',urlencodedParser,function(req,res,next){
   // console.log(req.body.date,"where this mnb kdfbndbndlfbnlfbndflbjndlfbndflbn")
   var connection;
   var conndets=req.body.UPDATECONNECTION
   var updateconn=req.body.UpdateConnection;
   var time;
   console.log(updateconn,"updateconn")
   var connobj;
   console.log(conndets,"conndets")
if(conndets===undefined&&updateconn===undefined)
   {
      console.log("overeknjgekjnrg",fields)
   if(req.body.start>req.body.end)
    time=req.body.end+" to "+req.body.start;
   else
    time=req.body.start+" to "+req.body.end;
    console.log(time,"time here",req.body.host,"host here","deatials here",req.body.details,"req.body.date",req.body.when)
connection={ connectiontopic:req.body.topic,connectionname:req.body.name,details:req.body.details,location:req.body.where,date:req.body.when,host:req.body.host,time:time}
   req.session.i=i;
   console.log(connection,"connection fields updated here",req.session.userid)
   new UserConnectionDB().addConnection(connection,userid).then(function(connection,userid){})
   res.render('newconnection.ejs',{the:req.session.i,topic:req.body.topic,List:undefined})
   }
else if(conndets!==undefined)
{
   new UserConnectionDB().beforeupdate(conndets).then(function(conid){
        res.render('newconnection.ejs',{the:req.session.i,topic:req.body.topic,List:conid})
      }) 
   } 
   else{
      console.log(updateconn,"iniside")
      time=req.body.end+" to "+req.body.start;
      var conn={ connectionid:updateconn,connectiontopic:req.body.topic,connectionname:req.body.name,details:req.body.details,location:req.body.where,date:req.body.when,host:req.body.host,time:time}
      console.log(conn,"conn")
        new UserConnectionDB().afterupdate(conn,userid).then(function(){
              console.log("userid,conid",userid,conn)
             
         res.render('newconnection.ejs',{the:req.session.i,topic:req.body.topic,List:conn})
        })    
}
})

router.post('/login.ejs',function(req,res){
   res.render('login.ejs',{message:undefined,the:undefined});
})
router.get('*/',function(req,res){
   res.render('error.ejs');
})
module.exports = router;
module.exports.log=log;