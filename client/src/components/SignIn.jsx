import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { signInStart, signInFailure, signInSuccess } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "./OAuth";
const SignIn = () => {
  const users = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(users);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post("/api/auth/signin", user);
      toast.success("User signed up successfully", { position: "top-right" });

      console.log(res.data);
      setUser(users);
      // console.log(error);
      if (res.data.success === false) {
        dispatch(signInFailure(res.data));
        return;
      }
      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={inputHandler}
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={inputHandler}
          className="bg-slate-100 p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {error ? error.response?.data?.message || "Something went wrong!" : ""}
      </p>
    </div>
  );
};

export default SignIn;
