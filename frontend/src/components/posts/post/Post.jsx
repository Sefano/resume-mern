import React from "react";
import "./post.scss";

const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="post__image">
        {post.image && (
          <img src={`http://localhost:1803/${post.image}`} alt="" />
        )}
      </div>
      <div className="post__title">{post.title}</div>
      <div className="post__text">{post.text}</div>
      <div className="post__author">{post.author.login}</div>
    </div>
  );
};

export default Post;
