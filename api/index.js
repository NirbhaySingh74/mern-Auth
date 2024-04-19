import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import route from "./routes/user.route.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;
// console.log(process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongodb connected");
    app.listen(PORT, () => {
      console.log(`App is running on PORT ${PORT}`);
    });
  })
  .catch((err) => console.log("mongodb connection error", err));

app.use("/api/user", route);
