import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.join(
      import.meta.dirname,
      "../uploads/",
      req.messageImgFolder
    );
    return cb(null, folder);
  },
  filename: (req, file, cb) => {
    const senderId = req.user.id;
    return cb(null, `${Date.now()}_${senderId}_${file.originalname}`);
  },
});

const uploadMessageImage = multer({ storage });

export default uploadMessageImage;
