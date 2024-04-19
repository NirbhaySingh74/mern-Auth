import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import useRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());
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

app.use("/api/user", useRoutes);
app.use("/api/auth", authRoutes);
