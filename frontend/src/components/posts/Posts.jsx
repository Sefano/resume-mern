import React, { useEffect, useState } from "react";
import "./posts.scss";
import Post from "./post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../api/postApi";
import CreatePost from "../createPost/CreatePost";
import EditPost from "../editPost/EditPost";

const Posts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  //Отключаем скролл при открытии модального окна
  if (isModalOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  useEffect(() => {
    dispatch(getPosts());
  }, []);
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
