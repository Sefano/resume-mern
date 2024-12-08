import { Router } from "express";
import checkAuth from "../middlewares/checkAuth.js";
import * as messageController from "../controllers/messageController.js";
import * as reqValidator from "../helpers/reqValidator.js";
import createFolder from "../middlewares/createFolder.js";
import uploadMessageImage from "../utils/image-message-upload.js";

const messageRouter = new Router();

messageRouter.get("/contacts", checkAuth, messageController.getContacts);
messageRouter.get("/:id", checkAuth);

messageRouter.post(
  "/send/:id",
  checkAuth,
  reqValidator.messageValidator,
  createFolder,
  uploadMessageImage.single("image"),

  messageController.sendMessage
);
messageRouter.post(
  "/upload/:id",
  checkAuth,
  createFolder,
  uploadMessageImage.single("image"),
  (req, res) => {
    const folder = req.messageImgFolder;
    try {
      res.json({
        url: `upload/${folder}/${req.file.filename}`,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

messageRouter.get("/dialogue/:id", checkAuth, messageController.getMessages);

export default messageRouter;
