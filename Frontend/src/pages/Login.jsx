import PasswordInput from "../components/Input/PasswordInput";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";


function Login() {
  // For controlled components
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

let handleLogin = async (e) => {
  e.preventDefault();

  if (!email) {
    setError("Please enter your email");
    return;
  }
  
  if (!password) {
    setError("Please enter the password");
    return
  }
  setError("")

  //Login API call
}

  return (
    <>
      <Navbar></Navbar>
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin} action="post">
            <h4 className="text-2xl mb-2">Login</h4>

            <input type="email" placeholder="Email" className="input-box" value={email}
            onChange={(e) => {setEmail(e.target.value)}} />

            <PasswordInput value={password}
            onChange={(e)=> {setPassword(e.target.value)}} />

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
