import jwt from "jsonwebtoken";
import "dotenv/config";
import Token from "../models/Token.js";

export const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SERCET, {
    expiresIn: "30m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SERCET, {
    expiresIn: "30d",
  });
  return { accessToken, refreshToken };
};

export const saveToken = async (userId, refreshToken) => {
  //проверяем, имеется ли токен
  const tokenData = await Token.findOne({
    user: userId,
  });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  //если токен не найден, то создаем его для пользователя
  const token = await Token.create({
    user: userId,
    refreshToken,
  });
  return token;
};

export const removeToken = async (refreshToken) => {
  const tokenData = await Token.deleteOne({ refreshToken });
};

export const validateAccessToken = (token) => {
  try {
    const tokenData = jwt.verify(token, process.env.JWT_ACCESS_SERCET);
    return tokenData;
  } catch (error) {
    console.log(error);
  }
};

export const validateRefreshToken = (token) => {
  try {
    const tokenData = jwt.verify(token, process.env.JWT_REFRESH_SERCET);
    return tokenData;
  } catch (error) {
    console.log(error);
  }
};
