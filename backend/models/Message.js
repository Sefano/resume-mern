import { Schema, model } from "mongoose";

const Message = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    reciever: { type: Schema.Types.ObjectId, ref: "User" },
    text: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export default model("Message", Message);
