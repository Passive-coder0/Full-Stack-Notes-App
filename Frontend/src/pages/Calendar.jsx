import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";


function Calendar() {
  const [userInfo, setUserInfo] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);

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

  useEffect(() => {
    const days = getDaysInMonth(
      currentDate.getFullYear(),
      currentDate.getMonth(),
    );
    setDaysInMonth(days);
    getUserInfo();
  }, [currentDate]);

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const changeMonth = (direction) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + direction,
      1
    );
    setCurrentDate(newDate);
  };

  return (
    <>
      <Navbar userInfo={userInfo}></Navbar>
      <div className="calendar-container dark:text-white p-4 text-center">
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={() => changeMonth(-1)}
            className="bg-blue-500 dark:bg-violet-900 text-white px-4 py-2 rounded hover:bg-blue-600 hover:dark:bg-violet-800"
          >
            Prev
          </button>
          <h2 className="text-lg font-bold">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => changeMonth(1)}
            className="bg-blue-500 dark:bg-violet-900 text-white px-4 py-2 rounded hover:bg-blue-600 hover:dark:bg-violet-800"
          >
            Next
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="font-semibold">
              {day}
            </div>
          ))}
          {daysInMonth.map((day) => (
            <div
              key={day.toISOString()}
              className={`p-2 rounded ${
                isToday(day) ? "bg-blue-500 dark:bg-violet-800 text-white" : "hover:bg-gray-400"
              }`}
            >
              {day.getDate()}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Calendar;
