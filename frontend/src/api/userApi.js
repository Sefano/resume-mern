import axios from "axios";
import { setUser } from "../redux/reducers/userReducer";

export const registration = (login, email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:0803/api/registration",
        {
          login,
          email,
          password,
        }
      );
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.accessToken);
      console.log("Регистрация прошла успешно");
    } catch (error) {
      console.log(error);
    }
  };
};
