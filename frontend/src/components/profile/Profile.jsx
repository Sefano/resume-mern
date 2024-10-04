import React, { useEffect, useState } from "react";
import "./profile.scss";
import avatar from "./213.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../api/userApi";
import { useParams } from "react-router-dom";
import api from "../../axios/axios";
import Post from "../posts/post/Post";
import { setPosts } from "../../redux/reducers/postReducer";
import { hideLoader, showLoader } from "../../redux/reducers/loaderReducer";

const Profile = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [info, setInfo] = useState({});

  const posts = useSelector((state) => state.posts.posts);
  const loader = useSelector((state) => state.loader.loader);

  useEffect(() => {
    dispatch(showLoader());
    if (!localStorage.getItem("token")) {
      return;
    }
    api
      .get(`/profile/${id}`)
      .then((res) => {
        setInfo(res.data);
        dispatch(setPosts(res.data.posts));
        console.log(res.data);
      })
      .catch((error) => {
        alert("Не удалось получить информацию о профиле");
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
    <div className="profile">
      <div className="profile__info">
        <div className="profile__image">
          <img src={avatar} alt="avatar" />
        </div>
        <div className="profile__name">{info.user && info.user.login}</div>
      </div>
      <hr />
      <div className="profile__posts">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
