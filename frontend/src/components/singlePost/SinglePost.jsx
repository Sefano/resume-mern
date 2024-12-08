import React, { useEffect, useState } from "react";
import "./singlePost.scss";
import { NavLink, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import editIcon from "../../icons/edit.svg";
import axios from "axios";
import api from "../../axios/axios";
import EditPost from "../editPost/EditPost";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../redux/reducers/loaderReducer";
import avatar from "../../img/avatar-blank.png";
import { sendComment } from "../../api/postApi";

const SinglePost = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const loader = useSelector((state) => state.loader.loader);
  const user = useSelector((state) => state.user.currentUser);

  const handleCommentSend = () => {
    dispatch(sendComment(id, comment));
  };

  useEffect(() => {
    dispatch(showLoader());
    axios
      .get(`http://localhost:1803/api/post/${id}`)
      .then((res) => {
        setPost(res.data);
        setComments(res.data.comments);
        console.log(res.data.comments);
      })

      .catch((error) => {
        alert("Не удалось получить статью");
      })

      .finally(() => {
        dispatch(hideLoader());
      });
  }, []);

  if (loader) {
    return (
      <div className="loader">
        <div className="lds-dual-ring"></div>
      </div>
    );
  }

  return (
    <div className="singlePost">
      <div className="singlePost__wrapper">
        <div className="singlePost__image">
          <img src={`http://localhost:1803/${post.image}`} alt="" />
        </div>
        <h1 className="singlePost__title">{post.title}</h1>
        <ReactMarkdown children={post.text} className="singlePost__text" />
        <hr />
        <div className="singlePost__info-bar">
          {post.author && user.id === post.author._id ? (
            <div
              className="singlePost__edit"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <img src={editIcon} alt="editIcon" />
            </div>
          ) : (
            <></>
          )}
          {/* <div
            className="singlePost__edit"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <img src={editIcon} alt="editIcon" />
          </div> */}
          <NavLink
            className="singlePost__author"
            to={`/profile/${post.author && post.author._id}`}
          >
            {post.author && post.author.login}
          </NavLink>
          {/* <div className="singlePost__author">
            {post.author && post.author.login}
          </div> */}
        </div>
      </div>
      <div className="commentSection">
        <div className="commentSection__wrapper">
          <div className="commentSection__wrapper-input">
            <textarea
              maxLength={400}
              name="commetarea"
              id="commetarea"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button onClick={() => handleCommentSend()}>опубликовать</button>
          </div>
          <hr />
          <div className="commentSection__comment">
            {comments.map((comment, index) => (
              <div key={index} className="commentSection__comment-wrapper">
                <div className="commentSection__comment-profile">
                  <img
                    src={`http://localhost:1803/upload/profile-photos/${comment.author.avatar}`}
                    alt=""
                    className="commentSection__comment-profile-avatar"
                  />

                  <div className="commentSection__comment-profile-nickname">
                    <NavLink
                      to={`/profile/${comment.author._id}`}
                      className="navlink"
                    >
                      {comment.author.login}{" "}
                    </NavLink>
                  </div>
                </div>
                <div className="commentSection__comment-text">
                  {comment.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <EditPost
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        post={post}
      />
    </div>
  );
};

export default SinglePost;
