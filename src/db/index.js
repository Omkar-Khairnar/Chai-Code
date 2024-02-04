import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectToMongo=async()=>{
    try{
        const databaseInstance=await mongoose.connect(`${process.env.MONGOURI}/${DB_NAME}`)
        console.log(`MongoDB Connected !! DB Host : ${databaseInstance.connection.host}`);
    }
    catch(error){
        console.log("Database Connection Failed : " ,error);
        process.exit(1)
    }
}

export default connectToMongo;