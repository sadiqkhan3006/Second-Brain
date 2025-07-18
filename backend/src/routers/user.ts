import express, { Router } from "express";
import { user_signin, user_signup } from "../controllers/user";
const router: Router = express.Router();
router.post("/signup", user_signup);
router.post("/signin", user_signin);
export default router;
