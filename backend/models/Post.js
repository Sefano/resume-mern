import { Schema, model } from "mongoose";

const Post = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export default model("Post", Post);
