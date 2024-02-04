import  express  from "express";
import dotenv from 'dotenv'
import connectToMongo from "./db/index.js";
dotenv.config()
const app=express();
//Connecting To Database


connectToMongo().then(()=>{
    app.on("error", (error)=>{
        console.log("Error: ",error);
        throw error
    })
    app.listen(process.env.PORT || 5000 ,()=>{
        console.log(`Server Listening at http://localhost:${process.env.PORT}`);
    })
}).catch((err)=>{
    console.log("MongoDB connection Failed ",err);
})
