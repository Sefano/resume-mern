import express from "express";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import "dotenv/config";
import router from "./router/router.js";
import cookieParser from "cookie-parser";
import messageRouter from "./router/messageRouter.js";
import fileUpload from "express-fileupload";
import { Server } from "socket.io";

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use("/upload", express.static("uploads"));
// app.use(fileUpload({ defCharset: "utf8", defParamCharset: "utf8" }));
app.use("/api", router);
app.use("/api/messages", messageRouter);

const PORT = process.env.SERVER_PORT;

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

let onlineUsers = {};

export const getRecievetSocketId = (userId) => {
  return onlineUsers[userId];
};

io.on("connection", (socket) => {
  // const userId = socket.handshake.query.userId;
  // if (userId) {
  //   onlineUsers[userId] = socket.id;
  // }
  socket.on("addUser", (userId) => (onlineUsers[userId] = socket.id));
  io.emit("getOnlineUsers", Object.keys(onlineUsers));

  console.log(onlineUsers, "Пользователи онлайн");
  console.log("Пользователь присоединился", socket.id);

  // socket.on("deleteUser", (userId) => {
  //   onlineUsers.delete(userId);
  // });

  socket.on("disconnect", () => {
    console.log("Пользователь отключился");
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  });
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    server.listen(PORT, () => {
      console.log(`Сервер был успешно запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
