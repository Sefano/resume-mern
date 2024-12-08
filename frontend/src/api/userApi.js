import axios from "axios";
import { logoutUser, setUser } from "../redux/reducers/userReducer";
import { io } from "socket.io-client";
import api from "../axios/axios";
import { useSelector } from "react-redux";

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
      const response = await axios.post(
        "http://localhost:1803/api/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.accessToken);
      // socket.connect();

      console.log("Успешеный вход");
    } catch (error) {
      console.log(error);
      return error;
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
      // socket.disconnect();
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
      // socket.connect();
      console.log("Вы залогинены");
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchProfile = (id) => {
  return async () => {
    try {
      if (!localStorage.getItem("token")) {
        return;
      }
      const response = await api.get(`/profile/${id}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const uploadAvatar = (formData) => {
  return async () => {
    try {
      const response = await api.post("/avatar", formData);
      console.log("Фото профиля загружено");
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

// export const socket = io("http://localhost:1803", {
//   withCredentials: true,
// });

// export const connectSocket = () => {
//   const socket = io("http://localhost:1803", {
//     withCredentials: true,
//   });

//   socket.connect();
// };
// export const disconnectSocket = () => {};
