import { Navigate, useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import SearchBar from "./SearchBar";
import { useState } from "react";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate;

  const onLogout = () => {
    navigate("/login");
  };

  const handleSearch = () => {

  }

  const onClearSearch = () => {
    setSearchQuery("")  // Empty string
  }
  return (
    <>
      <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow-sm">
        <h2 className="text-2xl font-bold font py-2">Notes</h2>

        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        ></SearchBar>

        <ProfileInfo onLogout={onLogout}></ProfileInfo>
      </div>
    </>
  );
}

export default Navbar;
