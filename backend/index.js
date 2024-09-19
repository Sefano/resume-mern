import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import router from "./router/router.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use("/upload", express.static("uploads"));
app.use("/api", router);

const PORT = process.env.SERVER_PORT;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Сервер был успешно запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
