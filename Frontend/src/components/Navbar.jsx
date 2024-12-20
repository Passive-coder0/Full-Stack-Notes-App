import { useNavigate, useLocation } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import { useState } from "react";
import { CiDark } from "react-icons/ci";
import { SiDarkreader } from "react-icons/si";
import { MdOutlineDarkMode } from "react-icons/md";

function Navbar({ userInfo }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // I made Menu initially closed

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navItems = [
    { name: "Notes", path: "/notes" },
    { name: "Calendar", path: "/calendar" },
    { name: "Pomodoro", path: "/pomodoro" },
  ];

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow-sm">
      <div className="flex items-center">
        <div className="mr-4 h-9 w-9 my-1.5">
          <img src="Note.png" alt="App Logo" />
        </div>
        {/* Hamburger Menu Icon */}
        <button
          className="block md:hidden text-2xl ml-6 flex justify-center items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        {/* Navigation Items */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-12 left-4 z-50 bg-gray-50 border-4 border-slate-600 rounded-md md:static md:bg-white md:border-none md:flex flex-col md:flex-row md:items-center`}
        >
          {navItems.map((item) => (
            <div
              key={item.name}
              onClick={() => {
                navigate(item.path);
                setIsMenuOpen(false); // Closes menu when clicked
              }}
              className={`mx-4 my-2 text-center text-lg cursor-pointer ${
                location.pathname === item.path
                  ? "underline text-blue-600 font-semibold"
                  : "hover:text-blue-600"
              }`}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center cursor-pointer" onClick={() => {}}>
          <MdOutlineDarkMode className="ml-8 h-7 w-7 my-1.5" />
        </div>
      </div>
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
}

export default Navbar;
