import PasswordInput from "../components/Input/PasswordInput";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../utils/axios";

function Login() {
  // For controlled components
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async (e) => {
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

    //Login API call (Using axios)
    try {
      const response = await axiosInstance.post(
        "/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json", // This bug was a headache
          },
        }
      );

      //Handle successful login
      if (response.data && response.data.accessToken) {
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
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin} action="post">
            <h4 className="text-2xl mb-2">Login</h4>

            <input
              type="email"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <PasswordInput
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            {/*Handle our custom error*/}
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Login
            </button>

            <div className="flex justify-center items-center text-sm mt-4 gap-1">
              <p>Not registered yet?</p>
              <Link to="/signup" className="font-medium text-primary underline">
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
