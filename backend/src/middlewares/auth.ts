import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config"
import { success } from "zod";
import { AuthenticatedRequest } from "../types";
export default function auth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const JWT_SECRET = process.env.JWT_SECRET || "abc";
        const token = req.body.token || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Token missing"
                }
            )
        }
        const decode = jwt.verify(token, JWT_SECRET);
        req.user = decode as JwtPayload;
        //console.log(decode);
        next();
    }
    catch (err) {
        return res.status(400).json(
            {
                success: false,
                message: "Token missing"
            }
        )
    }
}