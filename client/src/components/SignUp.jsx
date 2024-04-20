import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const SignUp = () => {
  const users = {
    username: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(users);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
      setLoading(true);
      setError(false);
      const res = await axios.post("/api/auth/signup/", user);
      toast.success("User signed up successfully", { position: "top-right" });

      console.log(res.data);
      setUser(users);
      setLoading(false);
      if (res.data.success === false) {
        setError(true);
        return;
      }
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={user.username}
          onChange={inputHandler}
          className="bg-slate-100 p-3 rounded-lg"
        />
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
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
    </div>
  );
};

export default SignUp;
