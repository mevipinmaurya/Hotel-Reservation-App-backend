import User from "../models/User.js"
import bcryptjs from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
    try {
        const password = req.body.password;
        const hasPass = await bcryptjs.hash(password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hasPass
        })

        await newUser.save()
        res.status(201).send("User has been created")
    } catch (error) {
        next(error)
    }
}


export const login = async (req, res, next) => {
    try {
        const username = req.body.username;
        const user = await User.findOne({ username: username });
        if (!user) {
            return next(createError(404, "User not found"))
        }
        const match = await bcryptjs.compare(req.body.password, user.password);
        if (!match) {
            return next(createError(404, "Incorrect password!"))
        }

        // JsonWebToken
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY)

        const { password, isAdmin, ...otherDetails } = user._doc

        // Seding tokens in cookies (after installing the cookie-parser)
        res.cookie("access_token", token, { httpOnly: true }).status(200).json({ ...otherDetails })
    } catch (error) {
        next(error)
    }
}