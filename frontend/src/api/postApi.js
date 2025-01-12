import axios from "axios";
import api from "../axios/axios";
import { addPost, setPosts, singlePost } from "../redux/reducers/postReducer";
import { hideLoader, showLoader } from "../redux/reducers/loaderReducer";
import { addComment } from "../redux/reducers/commentsReducer";

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

export const getPostPages = (page) => {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const response = await axios.get(
        `http://localhost:1803/api/posts?page=${page}&limit=5`
      );
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

export const repost = (id, text) => {
  return async (dispatch) => {
    try {
      const response = await api.patch(`/repost/${id}`, { text });
      console.log("Репост!");
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendComment = (id, comment, user) => {
  return async (dispatch) => {
    try {
      await api.patch(`/comment/${id}`, {
        comment,
      });
      const newComm = {
        author: {
          avatar: user.avatar,
          login: user.login,
        },
        text: comment,
      };
      console.log(user);
      dispatch(addComment(newComm));
    } catch (error) {
      console.log(error);
    }
  };
};

// export const fetchComments = (postId) => {
//   return async (dispatch) => {
//     try {
//       const response = await api.patch(`/post/${postId}/comments`);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
