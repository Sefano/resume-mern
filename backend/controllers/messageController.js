import User from "../models/User.js";
import Message from "../models/Message.js";
import * as messageService from "../services/messageService.js";
import { io } from "../index.js";
import { getRecievetSocketId } from "../index.js";
import ApiError from "../helpers/apiError.js";

export const getContacts = async (req, res) => {
  try {
    const user = req.user.id;
    const contacts = await messageService.getContacts(user);
    res.send(contacts);
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (req, res) => {
  try {
    let imageUrl;
    const text = req.body.text;

    const { id: recieverId } = req.params;
    const senderId = req.user.id;
    const path = req.messageImgFolder;
    if (!req.file && !text) {
      throw ApiError.BadRequest("Отсутствует контент");
      // return res.status(204).json({ message: "Отсутствует контент" });
    }
    if (req.file) {
      imageUrl = `upload/${path}/${req.file.filename}`;
    } else {
      imageUrl = "";
    }

    const message = new Message({
      sender: senderId,
      reciever: recieverId,
      text: text,
      image: imageUrl,
    });
    message.populate({
      path: "sender reciever",
      select: "_id avatar login",
    });
    await message.save();

    const sender = await User.findOne({ _id: senderId });
    const reciever = await User.findOne({ _id: recieverId });
    if (!sender.contacts.includes(recieverId)) {
      await sender.updateOne({ contacts: [...sender.contacts, recieverId] });
      await reciever.updateOne({ contacts: [...reciever.contacts, senderId] });
    }

    // await User.findOneAndUpdate({ _id: senderId }, { contacts: recieverId });
    // await User.findOneAndUpdate({ _id: recieverId }, { contacts: senderId });

    const recieverSocketId = getRecievetSocketId(recieverId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", message);
    }

    res.status(201).send(message);
  } catch (error) {
    console.log(error);
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: recieverId } = req.params;
    const senderId = req.user.id;

    const messages = await messageService.getMessages(senderId, recieverId);

    res.status(200).send(messages);
  } catch (error) {
    console.log(error);
  }
};
