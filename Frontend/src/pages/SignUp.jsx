import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PasswordInput from "../components/Input/PasswordInput";
import axiosInstance from "../utils/axios";
import "./Login.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  async function handleSignUp(e) {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(
        "/create-account",
        {
          fullName: name,
          email: email,
          password: password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data?.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/notes");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      const message =
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      setError(message);
    }
  }

  return (
    <>
      <Navbar />
      <div className="signup-page mt-8">
        <div className="form-container">
          <div className="w-80 md:w-96 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:shadow-[0_3px_10px_rgba(255,255,255,0.05)] bg-slate-50 dark:bg-slate-950 dark:text-white">
            <div className="image-container rounded-t-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:shadow-[0_3px_10px_rgba(255,255,255,0.05)]">
              <img src="Air.jpg" alt="" />
            </div>
            <form className="px-7 py-8" onSubmit={handleSignUp}>
              <h4 className="text-2xl mb-4">Sign Up</h4>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-box"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-box"
              />
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
              <button
                type="submit"
                className="btn-primary dark:btn-primary-dark"
              >
                Create an account
              </button>
              <div className="flex justify-center items-center text-sm mt-4 gap-2">
                <p>Already have an account?</p>
                <Link
                  to="/login"
                  className="font-medium text-primary underline dark:text-violet-600 hover:text-blue-600 dark:hover:text-violet-800"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
