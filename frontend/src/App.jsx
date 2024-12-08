import "./App.scss";
import Reg from "./components/registration/Reg";
import Login from "./components/login/Login";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/main/Main";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, createContext } from "react";
import { fetchAuth } from "./api/userApi";
import Posts from "./components/posts/Posts";
import SinglePost from "./components/singlePost/SinglePost";
import Profile from "./components/profile/Profile";
import Messages from "./components/messages/Messages";
import { io } from "socket.io-client";

const socket = io("http://localhost:1803", { autoConnect: false });

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const user = useSelector((state) => state.user.currentUser);
  const userId = useSelector((state) => state.user.currentUser.id);
  const dispatch = useDispatch();

  // const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (isAuth) {
      socket.connect();
      socket.emit("addUser", user.id);
    }
    return () => {
      socket.disconnect();
    };
  }, [user]);

  // console.log("render");

  // useEffect(() => {
  //   if (socket === null) return;
  //   socket.on("getOnlineUsers", (users) => setOnlineUsers(users));
  // }, [socket]);

  // useEffect(() => {
  //   if (socket === null) return;

  //   socket.emit("getOnli", (users) => {
  //     setOnlineUsers(users);
  //   });
  // }, [socket]);

  // useEffect(() => {
  //   if (socket === null) return;

  //   socket.on("getOnlineUsers", (users) => {
  //     setOnlineUsers(users);
  //   });
  // }, [socket]);

  // useEffect(() => {
  //   if (isAuth) {
  //     const newSocket = io("http://localhost:1803", {
  //       withCredentials: true,
  //       query: {
  //         userId: user.id,
  //       },
  //     });
  //     setSocket(newSocket);

  //     return () => {
  //       newSocket.disconnect();
  //     };
  //   }
  // }, [user]);

  // useEffect(() => {
  //   if (socket === null) return;
  //   // socket.emit("addNewUser", user?.id);
  //   socket.on("getOnlineUsers", (users) => {
  //     setOnlineUsers(users);
  //   });
  //   console.log(socket);
  // }, [socket]);

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
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/" Component={Main} />
            <Route path="/posts" Component={Posts} />

            <Route path="/post/:id" Component={SinglePost} />
            <Route path="/messages" element={<Messages socket={socket} />} />
            <Route
              path="/messages/:id"
              element={<Messages socket={socket} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
