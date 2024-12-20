import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Calendar from "./pages/Calendar";
import Pomodoro from "./pages/Pomodoro";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Modal from "react-modal";

Modal.setAppElement("#root");

// The React Router
const routes = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp />} /> {/* Default route */}
      <Route path="/notes" element={<Notes />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/pomodoro" element={<Pomodoro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);

function App() {
  return <>{routes}</>;
}

export default App;
