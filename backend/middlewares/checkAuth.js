import jwt from "jsonwebtoken";
import * as tokenService from "../services/tokenService.js";

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      res.status(401).json({
        message: "Ошибка авторизации",
      });
    }

    const decodedToken = tokenService.validateAccessToken(token);
    if (!decodedToken) {
      res.status(401).json({
        message: "Ошибка авторизации",
      });
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Ошибка авторизации",
    });
  }
};
