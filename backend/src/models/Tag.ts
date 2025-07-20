import mongoose from "mongoose";
const tagSchema = new mongoose.Schema({
    tagname: { type: String, required: true },
    description: { type: String, required: false, default: "" }
}, { timestamps: true })
const Tag = mongoose.model('Tag', tagSchema);
export default Tag;