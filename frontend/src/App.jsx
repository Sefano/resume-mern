import "./App.scss";
import Reg from "./components/registration/Reg";
import Login from "./components/login/Login";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/main/Main";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuth } from "./api/userApi";
import Posts from "./components/posts/Posts";
import SinglePost from "./components/singlePost/SinglePost";

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuth());
  }, []);
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/registration" Component={Reg} />
            <Route path="/login" Component={Login} />
            <Route path="/" Component={Main} />
            <Route path="/posts" Component={Posts} />
            <Route path="/post/:id" Component={SinglePost} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
