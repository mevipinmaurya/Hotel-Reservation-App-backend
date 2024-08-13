import jwt from "jsonwebtoken"
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(404, "You are not authenticated"))
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err)
            return next(createError(404, "Token is not valid!"))
        req.user = user;    // here is req.user the information { id: user._id, isAdmin: user.isAdmin } that are sent in cookies with token (int auth.controllers.js file), will be set to "user"
        next();
    })
}


export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        return next(createError(404, "You are not authorized!"))
    })
}


export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        }
        return next(createError(404, "You are not authorized!"))
    })
}