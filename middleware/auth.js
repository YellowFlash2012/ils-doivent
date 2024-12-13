import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import School from "../models/School.js";

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    // read token from cookies
    token = req.cookies.jwt;

    // console.log(token);

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.jwt_secret);
            // console.log(decoded);

            req.user = await School.findById(decoded.id).select("-password");
            // console.log(req.user);

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, invalid token!");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token!");
    }
});

export const admin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized, only for admin!");
    }
});
