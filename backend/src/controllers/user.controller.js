import { User } from "../models/user.models.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import jwt from "jsonwebtoken"


const generateAccessAndRefreshTokens = async (userId) => {
    try {

        const user = await User.findById(userId)
        if (!user) {
            throw new ApiError(
                404,
                "user not found"
            )
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false })


        return {
            accessToken,
            refreshToken
        };

    } catch (error) {
        throw error

    }
}


const refreshAccessToken = async (req, res) => {
    try {

        const incomingRefreshToken =
            req.cookies?.refreshToken ||
            req.body?.refreshToken

        if (!incomingRefreshToken) {
            throw new ApiError(
                401,
                "Refreshtoken is required"
            )
        }

        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )


        const user = await User.findById(decodedToken._id);

        if (!user) {
            throw new ApiError(
                401,
                "Invalid refresh token"
            )
        }

        if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(
                401,
                "refresh token is expired or invalid"
            )
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

        const options = {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        };

        return res.status(200)
            .cookie("accessToken", accessToken, options)
             .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    "Access token refreshed successfully",
                    {
                        accessToken,
                        refreshToken
                    }
                )
            )
    } catch (error) {

        return res.status(
            error.statusCode || 500
        ).json(
            new ApiError(
                error.statusCode || 500,
                error.message || "Something went wrong"
            )
        );

    }
}

const registerUser = async (req, res) => {


    try {
        const {
            email,
            password,
            username,
            phoneNumber,
            role
        } = req.body;

        if (
            [email, password, username, phoneNumber]
                .some((field) => !field || field.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required");
        }

        const existingUser = await User.findOne({
            $or: [
                { username },
                { email },
                { phoneNumber }
            ]
        });

        if (existingUser) {
            throw new ApiError(
                409,
                "User with email, username or phone number already exists"
            );
        }

        const user = await User.create({
            email,
            password,
            username,
            phoneNumber,
            role: role || "user"
        });

        const createdUser = await User
            .findById(user._id)
            .select("-password -refreshToken");

        if (!createdUser) {
            throw new ApiError(
                500,
                "Something went wrong while registering the user"
            );
        }

        // Generate access and refresh tokens
        const {
            accessToken,
            refreshToken
        } = await generateAccessAndRefreshTokens(user._id);

        console.log("ACCESS TOKEN:", accessToken);
console.log("REFRESH TOKEN:", refreshToken);

        // Cookie options for localhost development
        const options = {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/"
        };

        return res
            .status(201)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    201,
                    "User registered successfully",
                    createdUser
                )
            );

    } catch (error) {
        console.log("register error:", error);

        return res.status(error.statusCode || 500).json(
            new ApiError(
                error.statusCode || 500,
                error.message || "Something went wrong"
            )
        );
    }
};



const loginUser = async (req, res) => {
    try {

        const { email, username, password } = req.body;

        if ((!email && !username) || !password) {
            throw new ApiError(
                400,
                "email/username and password are required"
            )
        }

        const user = await User.findOne({

            $or: [
                { email },
                { username }
            ]
        })
        if (!user) {
            throw new ApiError(
                404,
                "user not found"
            )
        }

        const isPsswordValid = await user.isPasswordCorrect(password)

        if (!isPsswordValid) {
            throw new ApiError(
                401,
                "Invalid password"
            )
        }


        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        if (!loggedInUser) {
            throw new ApiError(
                500,
                "Something went wrong while logging in"
            )

        }

        const options = {
            httpOnly: true,
            secure: false,
            sameSite: "lax",

        }



        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200,
                    "User logged in successfully",
                    {
                        user: loggedInUser,

                        accessToken
                    }


                ));
    } catch (error) {

        console.log("login error:", error)

        return res.status(
            error.statusCode || 500
        ).json(
            new ApiError(
                error.statusCode || 500,
                error.message || "Something went wrong"
            )
        )

    }

}


const logoutUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $unset: {
                refreshToken: 1
            }
        })

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(
                new ApiResponse(
                    200,
                    "User logged out successfully"
                )
            )

    } catch (error) {
        return res.status(
            error.statusCode || 500,

        ).json(
            new ApiError(
                error.statusCode || 500,
                error.message || "something went wrong"
            )
        )

    }
}


const updateAccount = async (req, res) => {
    try {
        const { email, username, phoneNumber } = req.body;

        if (!username && !email && !phoneNumber) {
            throw new ApiError(
                400,
                "At least one filed is required"
            )
        }

        const user = await User.findByIdAndUpdate(req.user._id, {

            $set: {
                username,
                email,
                phoneNumber

            }
        },
            {
                new: true,
                runValidators: true
            }
        ).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(
                404,
                "Account details are not found"
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                "Account details updated successfully",
                user
            )
        )

    } catch (error) {
        return res.status(
            error.statusCode || 500
        ).json(
            new ApiError(
                error.statusCode || 500,
                error.message || "Something went wrong"
            )
        )
    }

}


const getCurrentUser = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(
                404,
                "User not found"
            )
        }

         res.set("Cache-Control", "no-store");


        return res.status(200).json(
            new ApiResponse(
                200,
                "Account details fetched successfully",
                user
            )
        )

    } catch (error) {

        return res.status(
            error.statusCode || 500
        ).json(
            new ApiError(
                error.statusCode || 500,
                error.message || "Something went wrong"
            )
        )

    }

}






export { registerUser, loginUser, refreshAccessToken, logoutUser, updateAccount, getCurrentUser }