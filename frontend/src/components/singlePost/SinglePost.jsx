import React, { useEffect, useState } from "react";
import "./singlePost.scss";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const SinglePost = () => {
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
      </div>
    </div>
  );
};

export default SinglePost;
