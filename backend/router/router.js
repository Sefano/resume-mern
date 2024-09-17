import { Router } from "express";
import * as userController from "../controllers/userController.js";
import * as reqValidator from "../helpers/reqValidator.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = new Router();

router.post(
  "/registration",
  reqValidator.registerValidator,
  userController.registration
);
router.post("/login", reqValidator.loginValidator, userController.login);
router.post("/logout", userController.logout);

router.get("/auth", checkAuth, userController.auth);
export default router;
