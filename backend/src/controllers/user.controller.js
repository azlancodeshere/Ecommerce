import {User} from "../models/user.models.js"
import {ApiError} from  "../../utils/ApiError.js"
import {ApiResponse} from  "../../utils/ApiResponse.js"



const registerUser = async(req,res) =>{
    try {
        const {email, password, username, phoneNumber} = req.body;

        if([email, password, username, phoneNumber].some((field) => !field || field.trim() === "")){

            throw new ApiError(400, "All fileds are required")
        }

        const existingUser = await User.findOne({
            $or :[
                {username},
                {email}
            ]
        });

        if(existingUser){
            throw new ApiError(409, "User with email or Username is allready exixts")
        }

        const user = await User.create({
            email,
            password,
            username,
            phoneNumber
        })

        const createdUser= await User.findById(user._id).select("-password -refreshToken");
        if(!createdUser){
            throw new ApiError(500, "something went wrong while registring the user")
        }

        return res.status(201).json(
            new ApiResponse(201, "User register successfully", createdUser)
        )
    } catch (error) {
        
        console.log("register error:", error)

        return res.status(error.statusCode || 500).json(
            new ApiError(error.statusCode || 500, error.message || "something went wrong")
        )
    }

}



export {registerUser}