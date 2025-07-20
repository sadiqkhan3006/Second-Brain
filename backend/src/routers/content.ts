import express from "express";
import { addcontent } from "../controllers/content";
import auth from "../middlewares/auth";
const router = express.Router();
router.post("/add", auth, addcontent);
export default router;
