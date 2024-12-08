import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploads/profile-photos");
  },
  filename: (req, file, cb) => {
    return cb(
      null,
      Buffer.from(req.user.id + file.originalname, "latin1").toString()
    );
  },
});

const uploadProfilePhoto = multer({ storage });
export default uploadProfilePhoto;
