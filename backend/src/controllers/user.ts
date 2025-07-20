require('dotenv').config();
import { Response } from "express";
import { AuthenticatedRequest } from "../types";
import z from "zod";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signupData = z.object({
    username: z.string(),
    password: z.string().min(7).max(14),
    confirmPassword: z.string().min(7).max(14),
}).refine((data) => data.confirmPassword === data.password, {
    path: ["confirmPassword"],
    message: "Password dont match"
})
const loginData = signupData.pick({
    username: true,
    password: true
});

export async function user_signup(req: AuthenticatedRequest, res: Response) {
    try {
        const { success, error } = signupData.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: error.issues,
            })
        }
        const { username, password }: z.infer<typeof signupData> = req.body;
        const Exists = await User.findOne({ username });
        if (Exists) {
            return res.status(400).json({
                success: false,
                message: "User already present"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password: hashedPassword
        })
        return res.status(200).json({
            success: true,
            message: "User registered !!",
            user
        })
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}
export async function user_signin(req: AuthenticatedRequest, res: Response) {
    try {
        const { username, password }: z.infer<typeof loginData> = req.body;
        const existingUser = await User.findOne({ username }).populate('contents');
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }
        //check hashed pass //
        if (!await bcrypt.compare(password, existingUser.password)) {
            //pass incorrect //
            return res.status(400).json({
                success: false,
                message: "Password incorrect"
            })
        }
        //make jwt
        const payload = {
            username,
            id: existingUser._id
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const token = jwt.sign(payload, secret, {
            expiresIn: "2d"
        });
        const userWithoutPassword = {
            ...existingUser.toObject(),
            password: undefined,
        };
        return res.status(200).json({
            token,
            userWithoutPassword,
            success: true,
            message: "Logged in success"
        })
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }

}