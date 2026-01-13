import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies?.authToken;
        // console.log("Auth Token from Cookie:", token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Get user from DB
        // console.log("Decoded Token:", decoded.id);
        const user = await User.findById(decoded.id);
        // console.log("Authenticated User:", user);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User not found"
            });
        }

        req.user = user; // Attach user to request
        next();

    } catch (error) {
        console.log("Auth Error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid or Expired Token"
        });
    }
};

export const isAdmin = (...roles) => {
    return (req, res, next) => {

        // req.user exist check
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User not found"
            });
        }

        // admin role check
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "User is not authorized to access this route"
            });
        }

        next();
    };
};
