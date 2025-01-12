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

  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(post.likedBy.includes(user.id));

  const [reposts, setReposts] = useState(post.reposts);

  const [animation, setAnimation] = useState("");

  const setLike = () => {
    dispatch(fetchLike(post._id));
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

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

      <div className="post__bar">
        <div className="post__bar-reposts">
          <div>{reposts}</div>
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
          <div>{likes}</div>
          <div
            onClick={() => {
              setLike();
            }}
          >
            <img
              className={liked ? "post__like-red" : ""}
              src={like}
              alt="like"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
