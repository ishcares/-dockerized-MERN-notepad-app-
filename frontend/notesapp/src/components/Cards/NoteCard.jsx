// src/components/Cards/NoteCard.jsx

import React from "react";
import { FiEdit, FiTrash2, FiStar } from "react-icons/fi";

const NoteCard = ({ note, onEdit, onDelete, onPin }) => {
  return (
    // ⭐️ FIX: Check for note.isPinned (assuming this is the backend key) ⭐️
    <div className={`
        shadow rounded p-3 relative transition 
        ${note.isPinned // ⬅️ Changed from note.pinned
            ? 'bg-red-50 border-red-300 border-2 shadow-xl' // Pinned style
            : 'bg-white hover:shadow-lg'} // Default style
    `}>
      {/* Pin icon */}
      <button
        onClick={onPin}
        className={`absolute top-2 right-2 ${
          // ⭐️ FIX: Check for note.isPinned here too ⭐️
          note.isPinned ? "text-red-500" : "text-gray-300" 
        } hover:text-red-400`}
      >
        <FiStar size={18} />
      </button>

      {/* Title */}
      <h3 className="text-sm font-semibold mb-1">{note.title}</h3>

      {/* Content */}
      <p className="text-xs text-gray-700 mb-2">{note.content}</p>

      {/* Actions */}
      <div className="flex justify-end space-x-2">
        <button onClick={onEdit} className="text-blue-500 hover:text-blue-700">
          <FiEdit size={16} />
        </button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700">
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;


