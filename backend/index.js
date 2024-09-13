import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

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
