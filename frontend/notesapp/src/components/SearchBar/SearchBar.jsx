import React from "react";
import { IoMdClose } from "react-icons/io";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ value, onChange, placeholder = "Search notes..." }) => {
  const handleClear = () => onChange({ target: { value: "" } });

  return (
    <div className="relative w-64">
      {/* Search icon */}
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
        <FaSearch size={16} />
      </div>

      {/* Input field */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      {/* Close (X) icon */}
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <IoMdClose size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;




