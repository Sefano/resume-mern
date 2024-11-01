import { Router } from "express";
import * as userController from "../controllers/userController.js";
import * as reqValidator from "../helpers/reqValidator.js";
import * as postController from "../controllers/postController.js";
import checkAuth from "../middlewares/checkAuth.js";
import uploadPostImage from "../utils/post-photo-upload.js";
import uploadProfilePhoto from "../utils/profile-photo-upload.js";
import User from "../models/User.js";

const router = new Router();

router.post(
  "/registration",
  reqValidator.registerValidator,
  userController.registration
);
router.post("/login", reqValidator.loginValidator, userController.login);
router.post("/logout", userController.logout);

router.get("/auth", checkAuth, userController.auth);

router.get("/profile/:id", checkAuth, userController.getProfile);

router.get("/refresh", userController.refresh);

router.post("/posts", checkAuth, postController.createPost);
router.patch("/post/:id", checkAuth, postController.editPost);

router.get("/posts", postController.getPosts);
router.get("/post/:id", postController.getPost);
router.get("/post/:id/posts", checkAuth, postController.getUserPosts);
router.get("/post/:id/likes", checkAuth, postController.getLiked);
router.get("/post/:id/reposts", checkAuth, postController.getReposted);

router.post(
  "/upload",
  checkAuth,
  uploadPostImage.single("image"),
  (req, res) => {
    try {
      // const filename = Buffer.from(req.file.originalname, "latin1").toString();
      res.json({
        url: `upload/${req.file.originalname}`,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

router.patch("/like/:id", checkAuth, postController.likePost);
router.patch("/repost/:id", checkAuth, postController.repostPost);

router.post(
  "/avatar",
  checkAuth,
  uploadProfilePhoto.single("image"),
  async (req, res) => {
    try {
      const avatar = req.file.filename;
      await User.findOneAndUpdate({ _id: req.user.id }, { avatar: avatar });
      res.json({ avatarUrl: `upload/profile-photos/${req.file.filename}` });
    } catch (error) {
      console.log(error);
    }
  }
);

export default router;
