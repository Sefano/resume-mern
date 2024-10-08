import React, { useEffect, useState } from "react";
import "./posts.scss";
import Post from "./post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../api/postApi";
import CreatePost from "../createPost/CreatePost";
import EditPost from "../editPost/EditPost";
import api from "../../axios/axios";
import { fetchProfile } from "../../api/userApi";

const Posts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedArray, setLikedArray] = useState([]);

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const loader = useSelector((state) => state.loader.loader);

  //Отключаем скролл при открытии модального окна
  if (isModalOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  if (loader) {
    return (
      <div className="loader">
        <div className="lds-dual-ring"></div>
      </div>
    );
  }
  return (
    <div className="posts">
      <div className="posts__navbar">
        <button
          className="posts__create"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Новый пост
        </button>
      </div>

      <div className="posts__post">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
      <CreatePost isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Posts;
