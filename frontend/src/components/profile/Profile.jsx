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
  const [tab, setTab] = useState("posts");
  const [liked, setLiked] = useState([]);
  const [reposted, setReposted] = useState([]);

  const posts = useSelector((state) => state.posts.posts);
  const loader = useSelector((state) => state.loader.loader);

  //эффект для первичного рендера
  useEffect(() => {
    dispatch(showLoader());
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

  //эффект для рендера вкладок
  useEffect(() => {
    if (tab === "posts") {
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
        });
    }
    if (tab === "likes") {
      if (!localStorage.getItem("token")) {
        return;
      }
      api
        .get(`/post/${id}/likes`)
        .then((res) => {
          setLiked(res.data[0].likedPosts);
          console.log(res.data[0].likedPosts);
        })
        .catch((error) => {
          alert("Не удалось получить информацию о профиле");
        });
    }
    if (tab === "reposts") {
      if (!localStorage.getItem("token")) {
        return;
      }
      api
        .get(`/post/${id}/reposts`)
        .then((res) => {
          setReposted(res.data[0].repostedPosts);
          console.log(res.data[0].repostedPosts);
        })
        .catch((error) => {
          alert("Не удалось получить информацию о профиле");
        });
    }
  }, [tab]);

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
      <div className="profile__bar">
        <button onClick={() => setTab("posts")}>Посты</button>
        <button onClick={() => setTab("reposts")}>Репосты</button>
        <button onClick={() => setTab("likes")}>Понравившиеся</button>
      </div>
      <hr />
      {tab === "posts" && (
        <div className="profile__posts">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
      {tab === "likes" && (
        <div className="profile__posts">
          <div>
            {liked.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
        </div>
      )}
      {tab === "reposts" && (
        <div className="profile__posts">
          <div>
            {reposted.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
