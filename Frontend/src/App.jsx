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
  return (
    <>
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20"></div>
        <div className="absolute inset-0 animate-wave-1 bg-gradient-to-r from-blue-100/30 via-purple-100/30 to-pink-100/30 dark:from-violet-900/10 dark:via-blue-900/10 dark:to-purple-900/10"></div>
        <div className="absolute inset-0 animate-wave-2 bg-gradient-to-l from-indigo-100/20 via-cyan-100/20 to-blue-100/20 dark:from-indigo-900/5 dark:via-blue-900/5 dark:to-violet-900/5"></div>
        <div className="absolute inset-0 animate-wave-3 bg-gradient-to-tr from-purple-100/25 via-pink-100/25 to-violet-100/25 dark:from-purple-900/8 dark:via-violet-900/8 dark:to-indigo-900/8"></div>
      </div>
      {routes}
    </>
  );
}

export default App;
