var Connections=require('../utils/ConnectionDB').connections
var db=require('../utils/ConnectionDB').db;
var connscehma=require('../utils/ConnectionDB').connscehma;
var mongoose=require('../utils/ConnectionDB').mongoose;
var userconnschema=require('../Model/UserConnection.js').userconnschema;
var userconns=require('../Model/UserConnection.js').userconns;
var connid=0;
var result=0;
class UserConnectionDB{
    constructor(){      
this.addConnection=(async(connection,userid)=>{     
    var connectionaw=await connection
    result=await Connections.findOne({},'connectionid -_id').sort('-connectionid');
    if(result===null)
    result=0;
    else{
    console.log("result of sort",result.connectionid)
    }
    //console.log(result,"res for u")
    // console.log({connectionid:result,connectionaw},"inside")
        console.log(Connections.find({connectionname:connectionaw.connectionname}).count()===0,"counts")
    if(await Connections.find({connectionname:connectionaw.connectionname}).count()===0)
    {if(result!=0)
        var finalconnid=result.connectionid;
        else
        var finalconnid=0
        finalconnid+=1;
     Connections.insertMany({owner_user_id:userid,connectionid:finalconnid,connectiontopic:connectionaw.connectiontopic,connectionname:connectionaw.connectionname,details:connectionaw.details,location:connectionaw.location,date:connectionaw.date,host:connectionaw.host,time:connectionaw.time})  
    }
     else   
     {
       connid= await Connections.find({connectionname:connectionaw.connectionname},'connectionid -_id')  
      console.log(connectionaw,"connectiondetails already exists",connid[0].connectionid)
        await Connections.findOneAndUpdate({connectionid:connid[0].connectionid},{$set:{owner_user_id:userid,connectiontopic:connectionaw.connectiontopic,connectionname:connectionaw.connectionname,details:connectionaw.details,location:connectionaw.location,date:connectionaw.date,host:connectionaw.host,time:connectionaw.time}})
      return connid[0];
         }
});
    this.beforeupdate=(async(connection)=>{   
        var restoupdate=await Connections.findOne({connectionid:connection});
        return restoupdate;
   });

   this.afterupdate=(async(connection,userid)=>{   
       console.log(connection,"connection")

     await Connections.findOneAndUpdate({connectionid:connection.connectionid},{$set:{owner_user_id:userid,connectiontopic:connection.connectiontopic,connectionname:connection.connectionname,details:connection.details,location:connection.location,date:connection.date,host:connection.host,time:connection.time}})
});


    this.deletecreatedconn=(async(connection)=>{   
         await Connections.findOneAndDelete({connectionid:connection});
    });
    this.addRSVP=(async(connectionID,userID,rsvp)=>{
        var cname= await Connections.find({connectionid:connectionID},'connectionname -_id')
        var ctopic=await Connections.find({connectionid:connectionID},'connectiontopic -_id')
        // console.log(cname,userID,"cname")
        // console.log(ctopic,"ctopic")
        userconns.find({connectionid:connectionID,userid:userID}).countDocuments({},async(err,counts)=>{
            // console.log(connectionID,"connectionID")
            if(counts===0&&rsvp!==undefined)
            {
            await userconns.insertMany({connectionid:connectionID,userid:userID,rsvp:rsvp,cname:cname[0].connectionname,ctopic:ctopic[0].connectiontopic})}
             else{
                //  console.log(rsvp,"counts")
                if(rsvp!==null&&rsvp!==undefined)
            await userconns.findOneAndUpdate({connectionid:connectionID,userid:userID},{$set:{rsvp:rsvp}})}
    })
})
 this.userprofile=(async(userID)=>{
    console.log(userID)
   var userconnections= await userconns.find({userid:userID})
  // console.log(userconnections,"inside udbs")
   return  userconnections;
})

this.updateconn=(async(connectionID,rsvp)=>{
    console.log(connectionID)
   var userconnections= await userconns.findOneAndUpdate({connectionid:connectionID},{rsvp:rsvp})
  // console.log(userconnections,"inside udbs")
   return  userconnections;
})
this.deleteconn=(async(connectionID,userID)=>{
   var userconnections= await userconns.findOneAndDelete({connectionid:connectionID,userid:userID})
   console.log(userconnections,"inside udbs")
})
    }
}
module.exports.UserConnectionDB=UserConnectionDB;
