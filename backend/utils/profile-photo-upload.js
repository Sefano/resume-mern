import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploads/profile-photos");
  },
  filename: (req, file, cb) => {
    return cb(null, req.user.id + file.originalname);
  },
});

const uploadProfilePhoto = multer({ storage });
export default uploadProfilePhoto;
