import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const loadMorePosts = useCallback(async () => {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:1803/api/posts?page=${page}&limit=5`
    );
    const newPosts = response.data;
    if (newPosts.length === 0) {
      setHasMore(false);
    } else {
      dispatch(setPosts(newPosts));
      // setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    dispatch(clearPosts());
  }, []);

  useEffect(() => {
    if (hasMore) {
      loadMorePosts();
    }
  }, [loadMorePosts, hasMore]);

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1); // Trigger loading of new posts by changing page number
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // const fetchData = () => {
  //   axios
  //     .get(`http://localhost:1803/api/posts?page=${page}&limit=5`)
  //     .then((response) => {
  //       console.log(response.data);
  //       dispatch(setPosts(response.data));

  //       setHasMore(response.data.length > 0);
  //       setPage(page + 1);
  //     })
  //     .catch((error) => console.log(error));
  // };

  // useEffect(() => {
  //   dispatch(clearPosts()); //очистка постов при переходе на другие страницы

  //   fetchData();
  // }, []);

  // const fetchMorePosts = () => {
  //   fetchData();
  // };

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
        <div className="posts__post">
          {posts.map((post, index) => (
            <div
              key={post._id}
              ref={posts.length === index + 1 ? lastPostElementRef : null}
            >
              <Post post={post} />
            </div>
          ))}
        </div>
        <div>
          {loading && (
            <div className="loader">
              <div className="lds-dual-ring"></div>
            </div>
          )}
        </div>
      </div>

      <CreatePost isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <RepostModal />
    </div>
  );
};

export default Posts;
