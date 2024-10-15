import React, { useState } from "react";
import "./post.scss";
import like from "../../../icons/like.svg";
import repost from "../../../icons/repost.svg";
import ReactMarkdown from "react-markdown";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import edit from "../../../icons/edit.svg";
import { fetchLike } from "../../../api/postApi";
import api from "../../../axios/axios";
import { hideModal, showModal } from "../../../redux/reducers/appReducer";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const repostModal = useSelector((state) => state.app.modal);

  return (
    <div className="post">
      <NavLink className="post__author" to={`/profile/${post.author._id}`}>
        {post.author.login}
      </NavLink>
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
      <div className="post__bar">
        <div className="post__bar-reposts">
          <div>{post.reposts}</div>
          <div
            onClick={() => {
              dispatch(showModal(post));
            }}
          >
            <img
              className={
                post.repostedBy.includes(user.id) ? "post__like-red" : ""
              }
              src={repost}
              alt="repost"
            />
          </div>
        </div>

        <div className="post__bar-likes">
          <div>{post.likes}</div>
          <div
            onClick={() => {
              dispatch(fetchLike(post._id));
            }}
          >
            <img
              className={post.likedBy.includes(user.id) ? "post__like-red" : ""}
              src={like}
              alt="like"
            />
          </div>
        </div>

        {/* <NavLink className="post__author" to={`/profile/${post.author._id}`}>
          {post.author.login}
        </NavLink> */}
      </div>
    </div>
  );
};

export default Post;
