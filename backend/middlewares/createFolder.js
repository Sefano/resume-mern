import fs from "fs";
import path from "path";

export default (req, res, next) => {
  const { id: recieverId } = req.params;
  const senderId = req.user.id;

  try {
    const filePathSender = path.join(
      import.meta.dirname,
      `../uploads/${senderId}-${recieverId}`
    );
    const filePathReciever = path.join(
      import.meta.dirname,
      `../uploads/${recieverId}-${senderId}`
    );

    if (fs.existsSync(filePathSender)) {
      req.messageImgFolder = `${senderId}-${recieverId}`;
      next();
    } else if (fs.existsSync(filePathReciever)) {
      req.messageImgFolder = `${recieverId}-${senderId}`;
      next();
    } else {
      fs.mkdirSync(filePathSender);
      req.messageImgFolder = `${senderId}-${recieverId}`;
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
