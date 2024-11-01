import React, { useState } from "react";
import "./repostModal.scss";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../redux/reducers/appReducer";
import Post from "../posts/post/Post";
import ReactMarkdown from "react-markdown";
import { repost } from "../../api/postApi";

const RepostModal = ({ repostModal }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.app.modal);
  const postForRepost = useSelector((state) => state.app.contentModal);

  const [text, setText] = useState("");

  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  const handleClose = (e) => {
    if (e.target.classList.contains("wrapper")) {
      dispatch(hideModal());
    }
  };
  const onClose = () => {
    dispatch(hideModal());
  };
  return (
    <>
      {isOpen && (
        <div className="edit__wrapper" onClick={handleClose}>
          <div className="edit__popup">
            <div className="edit__popup__content">
              <button className="edit__popup__close" onClick={onClose}>
                X
              </button>
              <textarea
                onChange={(e) => setText(e.target.value)}
                name="text"
                className="edit__popup__text"
                id="text"
                maxLength={620}
              ></textarea>

              <div className="post">
                <div className="post__author">{postForRepost.author.login}</div>
                <div className="post__image">
                  {postForRepost.image && (
                    <img
                      src={`http://localhost:1803/${postForRepost.image}`}
                      alt=""
                    />
                  )}
                </div>
                <div className="post__title">{postForRepost.title}</div>
                <p className="post__divider"></p>
                <ReactMarkdown
                  children={postForRepost.text}
                  className="post__text"
                />
              </div>

              <button
                className="edit__popup__button"
                onClick={() => {
                  dispatch(repost(postForRepost._id, text));
                }}
              >
                Опубликовать
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RepostModal;
