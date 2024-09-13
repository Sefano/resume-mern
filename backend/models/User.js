import { Schema, model } from "mongoose";

const User = new Schema({
  login: { type: String, reqiried: true, unique: true },
  email: { type: String, reqiried: true, unique: true },
  password: { type: String, require: true },
  avatar: { type: String },
});

export default model("User", User);
