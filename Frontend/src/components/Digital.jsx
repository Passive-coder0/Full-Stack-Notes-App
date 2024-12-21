import React, { useState, useEffect } from "react";

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="flex items-center justify-center box-content px-10 h-20 w-60
 bg-slate-100 border border-blue-500 dark:bg-[rgba(255,255,255,0.05)]  dark:border-violet-900  dark:text-white dark:shadow-[0_3px_10px_rgba(148,_0,_211,_0.2)]

 rounded-lg text-black">
      <span className="font-mono text-4xl tracking-wider">{formattedTime}</span>
    </div>
    
  );
}

export default DigitalClock;




