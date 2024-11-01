import React, { useEffect, useState } from "react";
import "./posts.scss";
import Post from "./post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getPostPages, getPosts } from "../../api/postApi";
import CreatePost from "../createPost/CreatePost";
import EditPost from "../editPost/EditPost";
import api from "../../axios/axios";
import { fetchProfile } from "../../api/userApi";
import RepostModal from "../repostModal/RepostModal";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { clearPosts, setPosts } from "../../redux/reducers/postReducer";

const Posts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedArray, setLikedArray] = useState([]);

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const loader = useSelector((state) => state.loader.loader);

  //Отключаем скролл при открытии модального окна
  if (isModalOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = () => {
    axios
      .get(`http://localhost:1803/api/posts?page=${page}&limit=5`)
      .then((response) => {
        console.log(response.data);
        dispatch(setPosts(response.data));

        setHasMore(response.data.length > 0);
        setPage(page + 1);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    dispatch(clearPosts()); //очистка постов при переходе на другие страницы
    fetchData();
  }, []);

  const fetchMorePosts = () => {
    fetchData();
  };

  if (loader) {
    return (
      <div className="loader">
        <div className="lds-dual-ring"></div>
      </div>
    );
  }
  return (
    <div className="posts">
      <div className="posts__navbar">
        <button
          className="posts__create"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Новый пост
        </button>
      </div>

      <div className="posts__container">
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMorePosts}
          hasMore={hasMore}
          loader={
            <div className="loader">
              <div className="lds-dual-ring"></div>
            </div>
          }
        >
          <div className="posts__post">
            {posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
        </InfiniteScroll>
      </div>

      <CreatePost isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <RepostModal />
    </div>
  );
};

export default Posts;
