import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import router from "./router/router.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

const PORT = process.env.SERVER_PORT || 1803;

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
