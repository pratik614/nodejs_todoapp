import { User } from "../models/user.js";
import bcrypt from "bcrypt";

import { sendCookie } from "../utils/features.js";
import errorHandler from "../middlewares/error.js";


export const getAllusers = async (req, res) => {
    res.send("working");
};


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return next(new errorHandler("user already exists", 400));
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password: hashedPassword });

        sendCookie(user, res, "Registered successfully", 201);

    } catch (error) {
        next(error);
    }
};


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");   // password select:false , so we cannot excess directly , now we can get

        if (!user) {
            return next(new errorHandler("invalid email or password", 400));
        }


        // brackets are crucial in if , when else is not used 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new errorHandler("invalid email or password", 400));
        }

        sendCookie(user, res, `welcome back ${user.name}`, 200);

    } catch (error) {
        next(error)
    }
};

export const getMyprofile = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });

};

export const logout = (req, res) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    })
        .json({
            success: true,
            user: req.user,

        });
};