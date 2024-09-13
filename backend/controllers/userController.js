import * as userService from "../services/userService.js";
import { validationResult } from "express-validator";

export const registration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Неверный формат данных",
        errors: errors.array(),
      });
    }
    const { login, email, password } = req.body;
    const user = await userService.registration(login, email, password);
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};
