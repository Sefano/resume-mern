import { Router } from "express";
import * as userController from "../controllers/userController.js";
import * as reqValidator from "../helpers/reqValidator.js";
import * as postController from "../controllers/postController.js";
import checkAuth from "../middlewares/checkAuth.js";
import upload from "../utils/multer.js";

const router = new Router();

router.post(
  "/registration",
  reqValidator.registerValidator,
  userController.registration
);
router.post("/login", reqValidator.loginValidator, userController.login);
router.post("/logout", userController.logout);

router.get("/auth", checkAuth, userController.auth);

router.get("/refresh", userController.refresh);

router.post("/posts", checkAuth, postController.createPost);
router.patch("/post/:id", checkAuth, postController.editPost);

router.get("/posts", postController.getPosts);
router.get("/post/:id", postController.getPost);

router.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  try {
    // const filename = Buffer.from(req.file.originalname, "latin1").toString();
    res.json({
      url: `upload/${req.file.originalname}`,
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
