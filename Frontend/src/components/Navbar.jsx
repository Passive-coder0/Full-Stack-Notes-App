import { useNavigate, useLocation } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import { useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

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
      className="bg-white/90 dark:bg-gray-900/90
      backdrop-blur-md border-b border-gray-300 dark:border-gray-700 flex items-center justify-between px-6 py-2 drop-shadow-sm"
    >
      <div className="flex items-center">
          {/* Logo and App Name */}
          <div className="flex items-center mr-6">
          {/* Zen Logo - SVG */}
          <div className="mr-3 h-10 w-10 my-1.5 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer circle - represents completeness and unity */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-gray-600 dark:text-gray-300"
              />
              
              {/* Inner zen stone/mountain */}
              <path
                d="M20 70 Q35 30, 50 50 Q65 30, 80 70 Z"
                fill="currentColor"
                className="text-gray-700 dark:text-gray-200"
              />
              
              {/* Small circle - represents mindfulness/focus */}
              <circle
                cx="50"
                cy="25"
                r="4"
                fill="currentColor"
                className="text-blue-500 dark:text-violet-400"
              />
              
              {/* Ripple lines for zen water/meditation */}
              <path
                d="M25 75 Q50 72, 75 75"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-blue-400 dark:text-violet-300"
              />
              <path
                d="M30 80 Q50 78, 70 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-blue-300 dark:text-violet-200"
              />
            </svg>
          </div>
          
          {/* App Name */}
          <h1 className="text-xl font-bold text-gray-800 dark:text-white tracking-wide">
            <span className="text-blue-600 dark:text-violet-400">Zen</span>
            <span className="ml-1">Notes</span>
          </h1>
        </div>

        {/* Animated Theme Toggle Button */}
        <div
          className="relative flex justify-center items-center cursor-pointer mx-2 group"
          onClick={toggleTheme}
        >
          <div className="relative w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full transition-all duration-300 ease-in-out shadow-inner">
            {/* Toggle Circle */}
            <div
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out transform ${
                isDarkMode ? "translate-x-6 bg-yellow-300" : "translate-x-0.5 bg-gray-100"
              }`}
            >
              {/* Icon inside the circle */}
              <div className="flex items-center justify-center w-full h-full">
                {isDarkMode ? (
                  <MdOutlineLightMode className="w-3 h-3 text-yellow-600 transition-opacity duration-200" />
                ) : (
                  <MdOutlineDarkMode className="w-3 h-3 text-gray-600 transition-opacity duration-200" />
                )}
              </div>
            </div>
          </div>
          
          {/* Hover effect background */}
          <div className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-600 opacity-0 group-hover:opacity-20 transition-opacity duration-200 transform scale-125"></div>
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
