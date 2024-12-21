import { useNavigate, useLocation } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import { useState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";

function Navbar({ userInfo }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // I made Menu initially closed
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  ); // Check the initial theme

  const toggleTheme = () => {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      htmlElement.classList.add("dark");
      setIsDarkMode(true);
    }
  };

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
    <div
      className="bg-white/90 dark:bg-transparent
      backdrop-blur-md border-b border-gray-300 dark:border-gray-900 flex items-center justify-between px-6 py-2 drop-shadow-sm"
    >
      <div className="flex items-center">
        <div className="mr-4 h-9 w-9 my-1.5">
          <img
            src="Note.png"
            alt="App Logo"
            className="dark:filter dark:invert"
          />
        </div>

        <div
          className="flex justify-center items-center cursor-pointer mx-2"
          onClick={toggleTheme}
        >
          <MdOutlineDarkMode className="h-8 w-8 dark:text-white" />
        </div>
        {/* Hamburger Menu Icon */}
        <button
          className="block md:hidden text-2xl ml-6 text-center dark:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        {/* Navigation Items */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-12 left-4 z-50 bg-gray-50 border-4 border-slate-600 dark:border-violet-950 dark:bg-slate-900  rounded-md md:static md:bg-white md:border-none md:flex flex-col md:flex-row md:items-center dark:md:bg-transparent dark:text-white`}
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
                  ? "underline text-blue-600 font-semibold dark:text-violet-800"
                  : "hover:text-blue-600 hover:dark:text-violet-800"
              }`}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
}

export default Navbar;
