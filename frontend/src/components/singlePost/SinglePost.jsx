import React, { useEffect, useState } from "react";
import "./singlePost.scss";
import { NavLink, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import editIcon from "../../icons/edit.svg";
import axios from "axios";
import EditPost from "../editPost/EditPost";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../redux/reducers/loaderReducer";

const SinglePost = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  const [post, setPost] = useState({});

  const loader = useSelector((state) => state.loader.loader);

  useEffect(() => {
    dispatch(showLoader());
    axios
      .get(`http://localhost:1803/api/post/${id}`)
      .then((res) => {
        setPost(res.data);
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
          <div
            className="singlePost__edit"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <img src={editIcon} alt="editIcon" />
          </div>
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
      <EditPost
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        post={post}
      />
    </div>
  );
};

export default SinglePost;
