import { User } from "../model/user.model.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  if (!req.body) return res.status(404).json({ message: "filled is required" });
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    console.log(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
