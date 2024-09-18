const express=require("express");
const CustomError=require("./CustomError.js");
const app=express();

let port=80;
app.listen(port,()=>{
    console.log(`app is listening at port ${port}`);
});

// middleWare - (it run after getting request and before send response)
// It run  for every type of request (Get,Post,Put,patch,Delete)

// app.use((req,res,next)=>{
//     console.log("Hi, I am middleWare");
//     return next();
   
// });

// logger-Utility Middleware (It Store basic request info)
// app.use((req,res,next)=>{
//     console.log("HostName: ",req.hostname);
//     console.log("Path: ",req.path);
//     console.log("Method: ",req.method);
//     req.time=new Date(Date.now()).toString();
//     console.log("Requst Time",req.time);
//     next();
// });

// middleWare for specific path's
// app.use("/abc",(req,res,next)=>{
//     console.log("I am only for abc path");
//     next();
// });

// middleware for token (password protected)
// app.use("/api",(req,res,next)=>{
//     let {token}=req.query;
//     if(token==="getAccess"){
//         next();
//     }
//     res.send("AccessDenied");
// });

// this is  single middleWare for multiple routes (but Not all)
const checkToken=(req,res,next)=>{
        let {token}=req.query;
        if(token==="getAccess"){
            next();
        }
        // res.send("AccessDenied");
        // throw a custom error
        // throw new Error("Access Denied due to wrong token");
        throw new CustomError(401,"Access Denied !!"); 
        
    };
   
    
 
// routes
app.get("/",(req,res)=>{
    res.send("Hi,I am root route"); 
});
app.get("/random",(req,res)=>{
    res.send("Hi, I am random");
});
app.get("/api",checkToken,(req,res)=>{ 
    res.send("Access Granted");
});
app.get("/error",(req,res)=>{
    ab=ab;
   
});
app.get("/admin",(req,res)=>{
    throw new CustomError(403,"Failed to Access Admin");
});

// error handler middleWare
app.use((err,req,res,next)=>{
    console.log("------------ERROR--------------");
    // let {status,message}=err;
    let {status=500,message="Some Error Occured"}=err; // work as default argument like C++
    res.status(status).send(message);
});  


// if upper route is not match, then last middleWare execute
app.use((req,res)=>{
    res.send("Page not found");
});