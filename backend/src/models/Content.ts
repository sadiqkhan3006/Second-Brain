import mongoose from "mongoose";
const contentSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Title is required "] },
    link: { type: String },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
}, { timestamps: true })

const Content = mongoose.model("Content", contentSchema);
export default Content;