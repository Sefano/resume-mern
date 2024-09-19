import React, { useEffect } from "react";
import "./posts.scss";
import Post from "./post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../api/postApi";
import CreatePost from "../createPost/CreatePost";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  // const allPosts = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  return (
    <div className="posts">
      <div className="posts__navbar">Навигация</div>
      <div className="posts__post">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
      <CreatePost />
    </div>
  );
};

export default Posts;
