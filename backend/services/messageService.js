import fs from "fs";
import path from "path";
import Message from "../models/Message.js";
import User from "../models/User.js";

export const createImageFolder = (userId) => {
  const filePath = path.join(import.meta.dirname, `../uploads/${userId}`);
  try {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    } else {
      console.log("Не удалось создать папку");
    }
  } catch (error) {
    console.log(error);
  }
};

// export const imageMessageUpload = (recieverId, senderId, image) => {
//   const filePathSender = path.join(
//     import.meta.dirname,
//     `../uploads/${senderId}/${recieverId}`
//   );
//   const filePathReciever = path.join(
//     import.meta.dirname,
//     `../uploads/${recieverId}/${senderId}`
//   );
//   console.log(filePathReciever);

//   try {
//     if (!fs.existsSync(filePathSender)) {
//       fs.mkdirSync(filePathSender);
//       image.mv(filePathSender + `/${image.name}`);
//     } else {
//       image.mv(filePathSender + `/${image.name}`);
//       console.log("Папка уже создана, файл помещен");
//     }

//     if (!fs.existsSync(filePathReciever)) {
//       fs.mkdirSync(filePathReciever);
//       image.mv(filePathSender + `/${image.name}`);
//     } else {
//       image.mv(filePathReciever + `/${image.name}`);
//       console.log("Папка уже создана, файл помещен");
//     }
//     fs.readdirSync(filePathReciever, (err, files) => {
//       const total = files.length;
//       console.log(total);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const imageMessageUpload = (recieverId, senderId, image, path) => {
//   try {

//   } catch (error) {
//     console.log(error);
//   }
// };

export const getMessages = async (senderId, recieverId) => {
  const myMessages = await Message.find({
    sender: senderId,
    reciever: recieverId,
  }).populate({ path: "sender reciever", select: "login avatar" });
  const receivedMessages = await Message.find({
    sender: recieverId,
    reciever: senderId,
  }).populate({ path: "sender reciever", select: "login avatar" });
  return [...myMessages, ...receivedMessages].sort(
    (a, b) => a.createdAt - b.createdAt
  );
};

export const getContacts = async (user) => {
  const contacts = await User.findOne({ _id: user })
    .populate({
      path: "contacts",
      select: "login avatar",
    })
    .select("contacts");

  return contacts;
};
