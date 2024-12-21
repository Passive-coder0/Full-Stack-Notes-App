import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";

function Pomodoro() {
  const [userInfo, setUserInfo] = useState(null);
  const [time, setTime] = useState(25 * 60); // 25 x 60 to get seconds
  const [isRunning, setIsRunning] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25); // Default 25 minutes
  const timerRef = useRef(null);

  const navigate = useNavigate();

  // Get User Info to display on Navbar
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        console.error("Error fetching user info:", error);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(customMinutes * 60);
  };

  const handleTimeChange = (e) => {
    const value = parseInt(e.target.value, 10); // Turns the string into number
    if (!isNaN(value) && value > 0) {
      setCustomMinutes(value);
      setTime(value * 60); // Multiply by 60 to get seconds
    }
  };

  useEffect(() => {
    getUserInfo();
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            notifyUser();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const notifyUser = () => {
    if (Notification.permission === "granted") {
      new Notification("Pomodoro Timer", { body: "Time's up!" });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Pomodoro Timer", { body: "Time's up!" });
        }
      });
    }

    const audio = new Audio("/Notification.wav");
    audio.play();
  };

  const circumference = 2 * Math.PI * 100; // Radius = 100
  const progress = (time / (customMinutes * 60)) * circumference;

  return (
    <>
      <Navbar userInfo={userInfo}></Navbar>
        <div className="pomodoro-container text-center p-4 mt-24">
          <h1 className="text-3xl dark:text-white font-bold mb-6">
            Pomodoro Timer
          </h1>

          <div className="relative w-64 h-64 mx-auto mb-6">
            <svg
              className="absolute top-0 left-0"
              width="100%"
              height="100%"
              viewBox="0 0 220 220"
            >
              <circle
                cx="110"
                cy="110"
                r="100"
                fill="none"
                stroke="#5b21b6"
                strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-5xl font dark:text-white font-roboto">
              {formatTime(time)}
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={toggleTimer}
              className={`px-5 py-2 text-lg rounded text-white ${
                isRunning
                  ? "bg-red-700 hover:bg-red-800"
                  : "bg-violet-800 hover:bg-violet-900 dark:bg-violet-800 hover:dark:bg-violet-900"
              }`}
            >
              {isRunning ? "Pause" : "Start"}
            </button>
            <button
              onClick={resetTimer}
              className="ml-4 px-5 py-2 text-lg bg-gray-700 text-white rounded hover:bg-gray-800"
            >
              Reset
            </button>
          </div>

          <div className="mt-4">
            <label
              htmlFor="custom-time"
              className="mr-2 dark:text-white font-semibold"
            >
              Set Timer (minutes):
            </label>
            <input
              id="custom-time"
              type="number"
              max={30}
              value={customMinutes}
              onChange={handleTimeChange}
              className="w-16 p-1 text-lg border  bg-slate-200 dark:bg-slate-950 dark:text-white dark:border-violet-950 dark:border-2 rounded text-center"
            />
          </div>
        </div>
    </>
  );
}

export default Pomodoro;
