import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

function SearchBar({ value, onChange, handleSearch, onClearSearch }) {
  return (
    <div className=" hidden w-96 md:flex items-center px-4 py-2 bg-slate-100 rounded-full">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-xs bg-transparent py-1 outline-none"
        value={value}
        onChange={onChange}
      />

        {value && (<IoMdClose className="text-xl text-slate-500 cursor-pointer hover:text-black mr-2" onClick={onClearSearch}></IoMdClose>)}

      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black"
        onClick={handleSearch}
      ></FaMagnifyingGlass>
    </div>
  );
}

export default SearchBar;
