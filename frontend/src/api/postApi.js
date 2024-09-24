import axios from "axios";
import api from "../axios/axios";
import { addPost, setPosts, singlePost } from "../redux/reducers/postReducer";

export const getPosts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:1803/api/posts");
      // console.log(response.data);
      dispatch(setPosts(response.data));
    } catch (error) {
      console.log(error);
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
  return async (dispatch) => {
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
  return async () => {
    try {
      const response = await axios.get(`http://localhost:1803/api/post/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
};
