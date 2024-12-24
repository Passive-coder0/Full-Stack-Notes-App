import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PasswordInput from "../components/Input/PasswordInput";
import axiosInstance from "../utils/axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateEmail = useCallback((email) => /\S+@\S+\.\S+/.test(email), []);

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();

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
          "/login",
          { email, password },
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.data?.accessToken) {
          localStorage.setItem("token", response.data.accessToken);
          navigate("/notes");
        }
      } catch (error) {
        console.error("Login error:", error);
        const message =
          error.response?.data?.message ||
          "An unexpected error occurred. Please try again.";
        setError(message);
      }
    },
    [email, password, navigate, validateEmail]
  );

  return (
    <>
      <Navbar />
      <div className="login-page mt-16 ">
        <div className="form-container">
          <div className="w-80 md:w-96 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:shadow-[0_3px_10px_rgba(255,255,255,0.05)] bg-slate-50 dark:bg-slate-950 dark:text-white">
            <div className="image-container rounded-t-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:shadow-[0_3px_10px_rgba(255,255,255,0.05)]">
              <img src="Air.jpg" alt="" />
            </div>
            <form className="px-7 py-8" onSubmit={handleLogin}>
              <h4 className="text-2xl mb-4">Login</h4>
              <input
                type="email"
                placeholder="Email"
                className="input-box"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                Login
              </button>
              <div className="flex justify-center items-center text-sm mt-4 gap-2">
                <p>Not registered yet?</p>
                <Link
                  to="/signup"
                  className="font-medium text-primary underline dark:text-violet-600 hover:text-blue-600 dark:hover:text-violet-800"
                >
                  Create an account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
