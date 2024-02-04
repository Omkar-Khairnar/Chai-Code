import cookieParser from "cookie-parser";
import express, { urlencoded }  from "express";
import cors from 'cors'

const app=express();

app.use(express.json());
app.use(express.static("public"))
app.use(cookieParser())

app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

export {app}