import express from "express";
import { homePage } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", homePage);

export default router;
