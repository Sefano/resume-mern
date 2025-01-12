import { body } from "express-validator";

export const registerValidator = [
  body("login", "Логин должен содержать от 2 до 18 символов")
    .isLength({
      min: 2,
      max: 18,
    })
    .escape(),
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен содержать от 8 до 30 символов").isLength({
    min: 8,
    max: 30,
  }),
];

export const loginValidator = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен содержать от 8 до 30 символов").isLength({
    min: 8,
    max: 30,
  }),
];

export const messageValidator = [
  body("text", "Сообщение не может превышать 600 символов")
    .isLength({
      min: 1,
      max: 600,
    })
    .escape(),
];

export const postValidator = [
  body("title", "Заголовок должен содержать от 3х до 30 символов")
    .isLength({
      min: 3,
      max: 50,
    })
    .escape(),
  body("text", "Текст поста должен содержать от 30 до 1000 символов").isLength({
    min: 10,
    max: 1000,
  }),
];

export const commentValidator = [
  body("comment", "Заголовок должен содержать от 3х до 30 символов")
    .isLength({
      min: 1,
      max: 300,
    })
    .isString()
    .escape(),
];

export const repostValidator = [
  body("text", "Заголовок должен содержать от 3х до 30 символов")
    .isLength({
      min: 1,
      max: 300,
    })
    .isString()
    .escape(),
];
