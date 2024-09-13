import { body } from "express-validator";

export const registerValidator = [
  body("login", "Логин должен содержать от 2 до 18 символов").isLength({
    min: 2,
    max: 18,
  }),
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен содержать от 8 до 30 символов").isLength({
    min: 5,
    max: 30,
  }),
];
