import React from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({ searchText, setSearchText }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token"); // ✅ optional: clear auth token on logout
    navigate("/login");
  };

  return (
    <div className="bg-pink-500 text-white px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-medium">Notes</h2>

      {/* ✅ Controlled SearchBar (linked to Home.jsx) */}
      <SearchBar
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search notes..."
      />

      <ProfileInfo onLogout={onLogout} />
    </div>
  );
};

export default Navbar;

