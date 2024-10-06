import axios from "axios";
import api from "../axios/axios";
import { addPost, setPosts, singlePost } from "../redux/reducers/postReducer";
import { hideLoader, showLoader } from "../redux/reducers/loaderReducer";

export const getPosts = () => {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const response = await axios.get("http://localhost:1803/api/posts");
      // console.log(response.data);
      dispatch(setPosts(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoader());
    }
  };
};

export const createPost = (image, title, text) => {
  return async (dispatch) => {
    try {
      const response = await api.post("/posts", {
        image,
        title,
        text,
      });
      dispatch(addPost(response.data));
      console.log("Пост успешно создан");
    } catch (error) {
      console.log(error);
    }
  };
};

export const uploadPostImage = (formData) => {
  return async () => {
    try {
      const response = await api.post("/upload", formData);
      console.log("Изображение загружено");
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const getSinglePost = (id) => {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const response = await axios.get(`http://localhost:1803/api/post/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoader());
    }
  };
};

export const editPost = ({ id, image, title, text }) => {
  return async () => {
    try {
      const response = await api.patch(`/post/${id}`, {
        title,
        text,
        image,
      });
      console.log("Пост успешно отредактирован");
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchLike = (id) => {
  return async (dispatch) => {
    try {
      const response = await api.patch(`/like/${id}`);
      console.log("Сработало!");
    } catch (error) {
      console.log(error);
    }
  };
};
