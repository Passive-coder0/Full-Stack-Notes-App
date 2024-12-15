import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Modal from "react-modal";

Modal.setAppElement("#root");

// The React Router
const routes = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp />} /> {/* Default route */}
      <Route path="/dashboard" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);

function App() {
  return <>{routes}</>;
}

export default App;
