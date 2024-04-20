import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import useRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
app.use(bodyParser.json());
app.use(cors());
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

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
