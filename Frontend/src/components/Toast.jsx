import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { useEffect } from "react";

function Toast({ isShown, message, type, onClose }) {

  // To handle setInterval
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      onClose();
    }, 3000)
  
    return () => {
      clearTimeout(timeOutId);
    }
  }, [onClose]);
  

  return (
    <div
      className={`absolute top-20 right-6 transition-all duration-500 ${
        isShown ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`min-w-52 bg-white dark:bg-slate-800 border dark:border-none shadow-2xl dark:shadow-[0_4px_15px_rgba(255,255,255,0.2)] rounded-md after:w-1 after:h-full ${
          type === "delete" ? "after:bg-red-500" : "after:bg-green-500"
        }
        after:absolute after:left-0 after:top-0 after:rounded-l-lg `}
      >
        <div className="flex items-center gap-3 py-2 px-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              type === "delete" ? "bg-red-100 dark:bg-red-300" : "bg-green-100 dark:bg-green-300"
            }`}
          >
            {type === "delete" ? (
              <MdDeleteOutline className="text-xl text-red-500 dark:text-red-700" />
            ) : (
              <LuCheck className="text-xl text-green-500 dark:text-green-700" />
            )}
          </div>

          <p className="text-sm text-slate-800 dark:text-white">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Toast;
