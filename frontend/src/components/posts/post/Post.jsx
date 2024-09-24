import React from "react";
import "./post.scss";
import ReactMarkdown from "react-markdown";
import { NavLink } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="post__image">
        {post.image && (
          <img src={`http://localhost:1803/${post.image}`} alt="" />
        )}
      </div>
      <NavLink className="post__title" to={`/post/${post._id}`}>
        {post.title}
      </NavLink>
      <p className="post__divider"></p>
      <ReactMarkdown children={post.text} className="post__text" />
      {/* <div className="post__text">{post.text}</div> */}
      <div className="post__author">{post.author.login}</div>
    </div>
  );
};

export default Post;
