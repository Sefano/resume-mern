import React, { useEffect, useState } from "react";
import "./singlePost.scss";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import editIcon from "../../icons/edit.svg";
import axios from "axios";
import EditPost from "../editPost/EditPost";

const SinglePost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  const [post, setPost] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:1803/api/post/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((error) => {
        alert("Не удалось получить статью");
      });
  }, []);

  return (
    <div className="singlePost">
      <div className="singlePost__wrapper">
        <div className="singlePost__image">
          <img src={`http://localhost:1803/${post.image}`} alt="" />
        </div>
        <h1 className="singlePost__title">{post.title}</h1>
        <ReactMarkdown children={post.text} className="singlePost__text" />
        <hr />
        <div className="post__bar">
          <div
            className="post__edit"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <img src={editIcon} alt="editIcon" />
          </div>
          <div className="post__author"></div>
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
