import User from "../models/User.js";
import ApiError from "../helpers/apiError.js";
import bcrypt from "bcrypt";

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

  return user;
};
