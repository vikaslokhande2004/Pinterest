import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";



export const verifyJWT = asyncHandler(async (req,_, next) => {
    try {
        // Get token from cookies or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "No token provided");
        }
        // Verify token with the appropriate secret
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log("Decoded token:", decodedToken);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        // console.log("User found:", user);
        if (!user) {
            throw new ApiError(401, "Invalid access token: User not found");
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        throw new ApiError(401, "Invalid access token");
    }
});
