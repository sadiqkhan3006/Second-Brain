import { Request, Response } from "express";
import z from "zod";
import User from "../models/User";
const signupData = z.object({
    username: z.string(),
    password: z.string().min(7).max(14),
    confirmPassword: z.string().min(7).max(14),
})
export async function user_signup(req: Request, res: Response) {
    try {
        const { data, success, error } = signupData.safeParse(req.body);
        if (!success) {
            res.status(400).json({
                message: error.message,
            })
        }
        const { username, password, confirmPassword }: z.infer<typeof signupData> = req.body();
        const Exists = await User.findOne({ username });
        if (Exists) {
            return res.status(400).json({
                success: false,
                message: "User already present"
            })
        }
    }
    catch (err) {

    }
}