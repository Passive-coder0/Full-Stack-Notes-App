import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import PasswordInput from "../components/Input/PasswordInput";
import { useState } from "react";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSignUp(e) {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!password) {
      setError("Please enter your new password");
      return;
    }

    setError("");

    // SignUp API Call
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp} action="post">
            <h4 className="text-2xl mb-2">Sign Up</h4>

            <input
              type="text"
              placeholder="Name"
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            {/* Handle our custom error */}
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Create an account
            </button>

            <div className="flex justify-center items-center text-sm mt-4 gap-1">
              <p>Already have an account?</p>
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
