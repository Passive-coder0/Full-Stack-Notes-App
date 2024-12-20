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

  useEffect(() => {
    // Add the class for Login page
    document.body.classList.add("login-page-body");

    // Remove any other page-specific classes
    document.body.classList.remove("signup-page-body");

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("login-page-body");
    };
  }, []);

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
      <div className="login-page">
        <div className="background-image1"></div>
        <div className="background-image2"></div>
        <div className="form-container">
          <div className="w-96 border rounded bg-white px-7 py-10">
            <form onSubmit={handleLogin}>
              <h4 className="text-2xl mb-2">Login</h4>
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
              <button type="submit" className="btn-primary">
                Login
              </button>
              <div className="flex justify-center items-center text-sm mt-4 gap-1">
                <p>Not registered yet?</p>
                <Link
                  to="/signup"
                  className="font-medium text-primary underline"
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
