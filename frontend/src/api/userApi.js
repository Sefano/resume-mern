import axios from "axios";
import { logoutUser, setUser } from "../redux/reducers/userReducer";
import api from "../axios/axios";

export const registration = (login, email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:1803/api/registration",
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

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.accessToken);
      console.log("Успешеный вход");
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      if (!localStorage.getItem("token")) {
        return;
      }
      await api.post("/logout");
      localStorage.removeItem("token");
      dispatch(logoutUser());
      console.log("Вы вышли из аккаунта");
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchAuth = () => {
  return async (dispatch) => {
    try {
      if (!localStorage.getItem("token")) {
        return;
      }
      const response = await api.get("/auth");
      if (!response.data.user) {
      }
      dispatch(setUser(response.data.user));
      console.log("Вы залогинены");
    } catch (error) {
      console.log(error);
    }
  };
};

// export const fetchProfile = (id) => {
//   return async () => {
//     try {
//       if (!localStorage.getItem("token")) {
//         return;
//       }
//       const response = await api.get(`/profile/${id}`);
//       console.log(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
