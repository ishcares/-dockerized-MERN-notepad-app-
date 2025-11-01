import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
// Note: Assuming 'addNote' and 'editNote' were correctly passed via props 
// or imported from the correct path. (They are correctly imported here)
import { addNote, editNote } from "../../api/notes";

const AddEditNotes = ({ isOpen, onClose, onSave, note }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState(""); // 💡 New state for input field
  const [loading, setLoading] = useState(false);
  
  // Determine if we are in edit mode
  const isEditMode = Boolean(note && note._id);

  // ✅ Prefill form when editing
  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
      setTags(note.tags || []);
      // 💡 Update tag input field from stored tags for editing clarity
      setTagInput((note.tags || []).join(', '));
    } else {
      setTitle("");
      setContent("");
      setTags([]);
      setTagInput("");
    }
  }, [note]);

  // 💡 New function to parse the tag input string into an array
  const handleTagInput = (e) => {
    const input = e.target.value;
    setTagInput(input);
    
    // Parse tags by splitting the string by commas
    const tagArray = input.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    setTags(tagArray);
  };

  // ✅ Handle Save
  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
        toast.error("Please add a title or content to save the note.");
        return;
    }

    // 💡 Final validation for tags: ensure tags state is used.
    const finalTags = tags.filter(tag => tag.length > 0);

    setLoading(true);
    try {
      let res;
      // Use finalTags in the payload
      const payload = { title, content, tags: finalTags };

      if (isEditMode) {
        // Editing existing note
        res = await editNote(note._id, payload);
      } else {
        // Creating new note
        res = await addNote(payload);
      }

      if (res.success) {
        // Inform the parent (Home.jsx) of success with the saved note object
        onSave(res.note); 
        toast.success(isEditMode ? "Note updated successfully!" : "Note added successfully!");
      } else {
        toast.error(res.message || "Failed to save note due to server error.");
      }
    } catch (err) {
      console.error("Error saving note:", err);
      // Better error messaging for Axios/Network errors
      toast.error(err.response?.data?.message || err.message || "An unexpected network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <h2 className="text-xl font-semibold mb-2">
          {isEditMode ? "Edit Note" : "Add Note"}
        </h2>
        
        {/* Title Input Field */}
        <div className="mb-4">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
        </div>

        {/* Content Textarea Field */}
        <div className="mb-4">
            <textarea
                placeholder="Write your note..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            ></textarea>
        </div>
        
        {/* 💡 Tags Input Field (New) */}
        <div className="mb-4">
            <input
                type="text"
                placeholder="Tags (e.g., work, personal, idea)"
                value={tagInput}
                onChange={handleTagInput}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <p className="text-xs text-gray-500 mt-1">Separate tags with commas.</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 rounded bg-pink-500 text-white hover:bg-pink-600 text-sm"
          >
            {loading ? "Saving..." : (isEditMode ? "Update" : "Save")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditNotes;