import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function PasswordInput({ value, onChange, placeholder }) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center bg-transparent border-[2px] border-gray-300 rounded mb-3 px-5">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 pr-3 rounded outline-none"
        type={isShowPassword ? "text" : "password"} // Toggle password visibility
      />

      {isShowPassword ? (
        <FaRegEye
          size={22}
          className="text-primary dark:text-violet-500 cursor-pointer"
          onClick={toggleShowPassword} // Correct event handler
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-slate-400 cursor-pointer"
          onClick={toggleShowPassword} // Correct event handler
        />
      )}
    </div>
  );
}

export default PasswordInput;
