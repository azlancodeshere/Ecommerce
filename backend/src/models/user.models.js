import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true
        },

        phoneNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },

        refreshToken: {
            type: String
        },

        role:{
            type:String,
            enum:["user","admin"],
            default:"user"
        }
    },
    {
        timestamps: true
    }
);


userSchema.pre("save", async function () {

    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10)   
})


userSchema.methods.isPasswordCorrect = async function (password){

    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
       {
         _id:this._id,
        email:this.email,
        username:this.username,
        role:this.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }

    )
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
      {
          _id: this._id
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
    )
}



export const User = mongoose.model("User", userSchema);