import jwt from "jsonwebtoken";
import  {User} from "../models/user.models.js"  
import { ApiError } from "../../utils/ApiError.js";

export const authMiddleware= async (req,res,next)=>{
    
  try{

    const token = req.cookies?.accessToken || req.headers("Authorization")?.replace("Bearer ", "")

  }catch{

  }
}