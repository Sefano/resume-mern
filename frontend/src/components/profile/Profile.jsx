import React, { useEffect, useRef, useState } from "react";
import "./profile.scss";
import avatar from "./213.jpg";
import upload from "../../icons/upload-avatar.svg";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../../axios/axios";
import Post from "../posts/post/Post";
import { hideLoader, showLoader } from "../../redux/reducers/loaderReducer";
import InfiniteScroll from "react-infinite-scroll-component";
import { uploadAvatar } from "../../api/userApi";

const Profile = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const inputAvatarRef = useRef(null);

  const [likesPage, setLikesPage] = useState(1);
  const [postsPage, setPostsPage] = useState(1);
  const [repostPage, setRepostPage] = useState(1);

  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [hasMoreReposts, setHasMoreReposts] = useState(true);
  const [hasMoreLikes, setHasMoreLikes] = useState(true);

  // const [hasMore, setHasMore] = useState(true);

  const [info, setInfo] = useState({});
  const [tab, setTab] = useState("posts");
  const [liked, setLiked] = useState([]);
  const [reposts, setReposts] = useState([]);
  const [posts, setPosts] = useState([]);

  // const posts = useSelector((state) => state.posts.posts);
  const loader = useSelector((state) => state.loader.loader);

  //эффект для первичного рендера и загрузки данных профиля
  useEffect(() => {
    dispatch(showLoader());
    api
      .get(`/profile/${id}`)
      .then((res) => {
        setInfo(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        alert("Не удалось получить информацию о профиле");
      })
      .finally(() => {
        dispatch(hideLoader());
      });
  }, []);

  //получение постов
  const fetchDataPosts = () => {
    api
      .get(`/post/${id}/posts?page=${postsPage}&limit=5`)
      .then((response) => {
        console.log(response);
        if (!response.data) {
          setHasMorePosts(false);
          setPosts([...posts]);
        } else {
          setPosts([...posts, ...response.data]);

          setHasMorePosts(response.data.length > 0);
        }

        setPostsPage(postsPage + 1);
      })
      .catch((error) => console.log(error));
  };
  //получение репостов
  const fetchDataReposts = () => {
    api
      .get(`/post/${id}/reposts?page=${repostPage}&limit=5`)
      .then((response) => {
        console.log(response.data);
        if (!response.data) {
          setHasMoreReposts(false);
          setReposts([...reposts]);
        } else {
          setReposts([...reposts, ...response.data]);
          setHasMoreReposts(response.data.length > 0);
        }

        setRepostPage(repostPage + 1);
      })
      .catch((error) => console.log(error));
  };
  //получение лайков
  const fetchDataLikes = () => {
    api
      .get(`/post/${id}/likes?page=${likesPage}&limit=5`)
      .then((response) => {
        console.log(response.data);
        if (!response.data) {
          setHasMoreLikes(false);
          setLiked([...liked]);
        } else {
          setLiked([...liked, ...response.data]);
          setHasMoreLikes(response.data.length > 0);
        }

        setLikesPage(likesPage + 1);
      })
      .catch((error) => console.log(error));
  };

  const nextFetch = () => {
    if (tab === "posts") {
      fetchDataPosts();
    }
    if (tab === "likes") {
      fetchDataLikes();
    }
    if (tab === "reposts") {
      fetchDataReposts();
    }
  };

  //эффект для рендера вкладок
  useEffect(() => {
    if (tab === "posts") {
      if (!localStorage.getItem("token")) {
        return;
      }

      fetchDataPosts();
    }
    if (tab === "likes") {
      if (!localStorage.getItem("token")) {
        return;
      }

      fetchDataLikes();
    }
    if (tab === "reposts") {
      if (!localStorage.getItem("token")) {
        return;
      }

      fetchDataReposts();
    }
  }, [tab]);

  if (loader) {
    return (
      <div className="loader">
        <div className="lds-dual-ring"></div>
      </div>
    );
  }

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
      const response = await dispatch(uploadAvatar(formData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile">
      <div className="profile__info">
        <div
          className="profile__image"
          onClick={() => inputAvatarRef.current.click()}
        >
          <img src={upload} alt="upload" className="profile__image-upload" />

          {info.user && (
            <img
              src={`http://localhost:1803/upload/profile-photos/${info.user.avatar}`}
              alt="avatar"
              className="profile__image-avatar"
            />
          )}
        </div>
        <input
          ref={inputAvatarRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleChangeFile}
        />
        <div className="profile__name">{info.user && info.user.login}</div>
      </div>
      <div className="profile__bar">
        <button onClick={() => setTab("posts")}>Посты</button>
        <button onClick={() => setTab("reposts")}>Репосты</button>
        <button onClick={() => setTab("likes")}>Понравившиеся</button>
      </div>
      <hr />
      {tab === "posts" && (
        <InfiniteScroll
          dataLength={posts.length}
          next={nextFetch}
          hasMore={hasMorePosts}
          loader={
            <div className="loader">
              <div className="lds-dual-ring"></div>
            </div>
          }
        >
          <div className="profile__posts">
            {posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
        </InfiniteScroll>
      )}

      {tab === "likes" && (
        <InfiniteScroll
          dataLength={liked.length}
          next={nextFetch}
          hasMore={hasMoreLikes}
          loader={
            <div className="loader">
              <div className="lds-dual-ring"></div>
            </div>
          }
        >
          <div className="profile__posts">
            <div>
              {liked.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </div>
          </div>
        </InfiniteScroll>
      )}
      {tab === "reposts" && (
        <InfiniteScroll
          dataLength={reposts.length}
          next={nextFetch}
          hasMore={hasMoreReposts}
          loader={
            <div className="loader">
              <div className="lds-dual-ring"></div>
            </div>
          }
        >
          <div className="profile__posts">
            <div>
              {reposts.map((post) => (
                <div className="profile__reposts" key={post._id}>
                  <div className="profile__reposts-text">{post.text}</div>
                  <Post key={post._id} post={post.post} />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Profile;
