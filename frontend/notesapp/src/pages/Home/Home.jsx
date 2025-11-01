import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import AddEditNotes from "./AddEditNotes"; 
import {
  getNotes,
  addNote,
  editNote,
  deleteNote,
  pinNote,
  searchNotes,
} from "../../api/notes";

const Home = () => {
  // 1️⃣ STATE DEFINITIONS
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // Controls modal visibility
  const [currentNote, setCurrentNote] = useState(null); // Holds note data for editing
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // 2️⃣ FETCH NOTES (Centralized Logic)
  const fetchNotes = async (query = "") => {
    try {
      let data;
      if (query && query.trim() !== "") {
        data = await searchNotes(query);
      } else {
        data = await getNotes();
      }
      setNotes(data.notes || []);
    } catch (err) {
      console.error("Error fetching notes:", err);
      toast.error(err.message || "Failed to load notes!");
    }
  };

  // 3️⃣ CRUD HANDLERS

  // ➕ Add note - Opens modal with no data
  const handleAdd = () => {
    setCurrentNote(null); // Ensure no old data is present
    setModalOpen(true);
  };

  // ✏️ Edit note - Opens modal with note data
  const handleEdit = (note) => {
    setCurrentNote(note);
    setModalOpen(true);
  };

  // 🗑️ Delete note (Correct)
  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted!");
    } catch (err) {
      console.error("Error deleting note:", err);
      toast.error("Failed to delete note!");
    }
  };

  // 📌 Pin/unpin note (Correct)
  const handlePin = async (id) => {
    try {
      await pinNote(id);
      const updatedNotes = notes.map((note) =>
        note._id === id ? { ...note, isPinned: !note.isPinned } : note
      );
      setNotes(updatedNotes);
      toast.info("Note pin toggled!");
    } catch (err) {
      console.error("Error pinning note:", err);
      toast.error("Failed to toggle pin.");
    }
  };
    
  // 💾 Save handler — FINAL Version
  const handleSave = (savedNote) => {
    if (savedNote?._id) {
      // 📝 Edit existing note: Instant UI update
      setNotes((prev) =>
        prev.map((n) => (n._id === savedNote._id ? savedNote : n))
      );
      toast.success("Note updated!");
    } else {
      // ➕ Add new note: Instant UI update
      setNotes((prev) => [savedNote, ...prev]);
      toast.success("Note added!");
    }

    // ✅ Full cleanup after save (closing modal and resetting data)
    setModalOpen(false);
    setCurrentNote(null);
  };


  // 4️⃣ USE EFFECTS (Correct Debounce Logic)
  useEffect(() => {
    fetchNotes("");
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      const delayDebounce = setTimeout(() => {
        fetchNotes(searchText);
      }, 400);
      return () => clearTimeout(delayDebounce);
    }
  }, [searchText]);

  // 5️⃣ RENDER LOGIC
  const sortedNotes = [...notes].sort((a, b) => b.isPinned - a.isPinned);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar searchText={searchText} setSearchText={setSearchText} />

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          {/* Your Notes (Refresh) Button */}
          <button
            className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
            onClick={() => fetchNotes("")}
          >
            Your Notes
          </button>

          {/* ➕ Add Note Button (Opens Modal) */}
          <button
            onClick={handleAdd} // ⬅️ Opens the modal for adding
            className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-400 transition-colors"
          >
            Add Note
          </button>
        </div>

        {/* 🗒️ Notes Grid */}
        {sortedNotes.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={() => handleEdit(note)} // ⬅️ Opens modal for editing
                onDelete={() => handleDelete(note._id)}
                onPin={() => handlePin(note._id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10">
            No notes found. Try adding or searching!
          </p>
        )}
      </div>

      {/* ✏️ Add/Edit Modal (Rendered Conditionally) */}
      {modalOpen && (
        <AddEditNotes
          isOpen={modalOpen} // Pass state to show/hide internally
          note={currentNote}
          onClose={() => {
            setModalOpen(false);
            setCurrentNote(null); // Clear data when user clicks close/cancel
          }}
          onSave={handleSave} // Receives the saved note from AddEditNotes
        />
      )}
    </div>
  );
};

export default Home;
