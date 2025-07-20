import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String, required: [true, "Password required"] },
  contents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }]
},
  {
    timestamps: true
  }

);
const User = mongoose.model("User", userSchema);
export default User;
