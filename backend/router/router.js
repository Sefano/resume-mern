import { Router } from "express";
import * as userController from "../controllers/userController.js";
import * as reqValidator from "../helpers/reqValidator.js";

const router = new Router();

router.post(
  "/registration",
  reqValidator.registerValidator,
  userController.registration
);
router.post("/login", reqValidator.loginValidator, userController.login);

export default router;
