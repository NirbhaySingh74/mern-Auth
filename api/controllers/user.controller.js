import { User } from "../model/user.model.js";
export const homePage = async (req, res) => {
  try {
    const userData = await User.find();
    res.status(200).json(userData);
  } catch (error) {
    console.log(error);
  }
};
