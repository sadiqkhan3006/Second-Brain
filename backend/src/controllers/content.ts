import { Response } from "express";
import { AuthenticatedRequest } from "../types";
import z, { promise, success } from "zod";
import User from "../models/User";
import Content from "../models/Content";
import Tag from "../models/Tag";
import mongoose from "mongoose";
const newContent = z.object({
    type: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).min(1).max(5, "Only 5 tags Allowed"),
    title: z.string(),
    link: z.string(),
})
export async function addcontent(req: AuthenticatedRequest, res: Response) {
    try {
        const parseData = newContent.safeParse(req.body);
        if (!parseData.success) {
            return res.status(400).json({
                err: parseData.error.message,
                success: false,
            })
        }
        const content: z.infer<typeof newContent> = parseData.data;
        const userid = req.user?.id;
        const tagIds: mongoose.Types.ObjectId[] = await Promise.all(
            content.tags.map(async (name) => {
                let tagid = await Tag.findOne({ tagname: name });
                if (!tagid) {
                    tagid = await Tag.create({ tagname: name });
                }
                return tagid._id;
            })
        );

        const createdContent = await Content.create({
            type: content.type,
            description: content.description,
            tags: tagIds,
            title: content.title,
            link: content.link,
        });
        const updatedUser = await User.findByIdAndUpdate(userid, {
            $push: {
                contents: createdContent._id,
            }
        }, { new: true });
        return res.status(200).json({
            success: true,
            message: "content added",
            createdContent,
            updatedUser
        })
    }
    catch (err: any) {
        return res.status(400).json({
            error: err.message || "Internal sever error",
            success: false,
        })
    }

}