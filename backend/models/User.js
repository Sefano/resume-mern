import { Schema, model } from "mongoose";

const User = new Schema({
  login: { type: String, reqiried: true, unique: true },
  email: { type: String, reqiried: true, unique: true },
  password: { type: String, require: true },
  avatar: { type: String },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  likedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  repostedPosts: [
    {
      post: { type: Schema.Types.ObjectId, ref: "Post" },
      text: { type: String },
    },
  ],
  commentedPosts: [
    {
      post: { type: Schema.Types.ObjectId, ref: "Post" },
      text: { type: String },
    },
  ],
  contacts: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export default model("User", User);
