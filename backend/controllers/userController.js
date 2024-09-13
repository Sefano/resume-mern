import * as userService from "../services/userService.js";
import * as tokenService from "../services/tokenService.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const registration = async (req, res) => {
  try {
    //проверка наличия ошибок валидации
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Неверный формат данных",
        errors: errors.array(),
      });
    }
    const { login, email, password } = req.body;
    const userData = await userService.registration(login, email, password);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    //генерация и сохранения токенов
    return res.json(userData);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const userData = await userService.login(email, password);
  res.cookie("refreshToken", userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  return res.json(userData);
};
