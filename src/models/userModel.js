import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const UserSchema=new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps:true
    }
)

UserSchema.pre('save', async function(next){
    //If no change in password then no process required
    if(!this.isModified('password')) return next();
    //If change in password
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

//Definig Methods for UserSchema

//1. Checking User Entered Password with Encrypted Password in Database
UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

//2.Generating Access Token -> JWT Token
UserSchema.methods.generateAccessToken = async function(){
    return await jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

//3.Generating Refresh Token ysing JWT
UserSchema.methods.generateRefreshToken= async function(){
    return await jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model('user', UserSchema)