//import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set app element globally

//React Router
const routes = (
  <BrowserRouter>
    <Routes>
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
