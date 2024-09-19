import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
