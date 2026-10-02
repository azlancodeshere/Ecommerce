import { ApiError } from "../../utils/ApiError";

export const adminMiddleware = (req, res, next) => {
     

    // or jab router banega too authmiddle are see token check karega then adminmiddleware see role
    try{

        if(!req.user){
            throw new ApiError(
                401,
                "unauthorized request"
            )

        }




        if( req.user.role !== "admin" ){
            throw new ApiError(
                403,
                "Access denied. Admins only"
            )       
        }

    }catch(error){

   return res
            .status(error.statusCode || 500)
            .json(
                new ApiError(
                    error.statusCode || 500,
                    error.message || "Something went wrong"
                )
            );
    }
};