import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiError } from "../../utils/ApiError.js";

export const authMiddleware = async (req, res, next) => {

    try {

       ;

        const token =
            req.cookies?.accessToken ||
            req.headers.authorization?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(
                401,
                "Unauthorized request"
            );
        }

        const decodedToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        const user = await User
            .findById(decodedToken._id)
            .select("-password -refreshToken");

        if (!user) {
            throw new ApiError(
                401,
                "Invalid access token"
            );
        }

        req.user = user;

        next();

    } catch (err) {

        console.log("JWT Verification error:", err);

        return res
            .status(err.statusCode || 401)
            .json(
                new ApiError(
                    err.statusCode || 401,
                    err.message || "Invalid access token"
                )
            );
    }
};