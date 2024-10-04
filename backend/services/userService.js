import User from "../models/User.js";
import ApiError from "../helpers/apiError.js";
import bcrypt from "bcrypt";
import * as tokenService from "../services/tokenService.js";
import Token from "../models/Token.js";
import Post from "../models/Post.js";

export const registration = async (login, email, password) => {
  //проверка почты
  const userCheck = await User.findOne({ email });
  if (userCheck) {
    throw ApiError.BadRequest("Пользователь уже существует");
  }

  //проверка логина
  const loginCheck = await User.findOne({ login });
  if (loginCheck) {
    throw ApiError.BadRequest("Это имя пользователя занято");
  }

  //хеширование паролья
  const hashedPass = await bcrypt.hash(password, 10);

  const user = new User({ login, email, password: hashedPass });
  user.save();

  const tokens = tokenService.generateTokens({
    id: user._id,
    nickname: user.login,
  });
  await tokenService.saveToken(user._id, tokens.refreshToken);

  return {
    ...tokens,
    user: { id: user._id, nickname: user.login },
  };
};

export const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw ApiError.BadRequest("Неверный логин или пароль");
  }
  const passCheck = bcrypt.compare(password, user.password);
  if (!passCheck) {
    throw ApiError.BadRequest("Неверный логин или пароль");
  }
  const tokens = tokenService.generateTokens({
    id: user._id,
    nicnkame: user.login,
  });
  await tokenService.saveToken(user._id, tokens.refreshToken);

  return {
    ...tokens,
    user: { id: user._id, nickname: user.login },
  };
};

export const logout = async (refreshToken) => {
  const token = await tokenService.removeToken(refreshToken);
  return token;
};

export const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.UnathorizedError();
  }
  const userData = tokenService.validateRefreshToken(refreshToken);
  const dbToken = await Token.findOne({ refreshToken });

  if (!userData || !dbToken) {
    throw ApiError.UnathorizedError();
  }

  const user = await User.findOne({ _id: userData.id });

  const tokens = tokenService.generateTokens({
    id: user._id,
    nicnkame: user.login,
  });
  await tokenService.saveToken(user._id, tokens.refreshToken);
  return {
    ...tokens,
    user: { id: user._id, nickname: user.login },
  };
};

export const getProfile = async (id) => {
  const user = await User.findOne({ _id: id });
  const posts = await Post.find({ author: id });

  return { user, posts: posts };
};
