import * as userService from "../services/userService.js";
import * as tokenService from "../services/tokenService.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

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
  try {
    const { email, password } = req.body;
    const userData = await userService.login(email, password);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    const token = await userService.logout(refreshToken);
    res.clearCookie("refreshToken");
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

export const auth = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Ошибка авторизации",
      });
    }
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }
    return res.json({
      user: {
        id: user._id,
        login: user.login,
        email: user.email,
        likedPosts: user.likedPosts,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    const userData = await userService.refresh(refreshToken);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (req, res) => {
  try {
    const id = req.params.id;

    const userInfo = await userService.getProfile(id);

    return res.json(userInfo);
  } catch (error) {
    console.log(error);
  }
};
