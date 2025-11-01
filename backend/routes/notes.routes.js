
const express = require("express");
const router = express.Router();
const Note = require("../models/notes.model");
const { authenticateToken } = require("../utilities");

// Get all notes
router.get("/", authenticateToken, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json({ success: true, notes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create note
router.post("/add", authenticateToken, async (req, res) => {
  try {
    const { title, content, isPinned } = req.body;
    if (!title && !content)
      return res.status(400).json({ success: false, message: "Title or content required" });

    const newNote = new Note({
      userId: req.user.id,
      title,
      content,
      isPinned: isPinned || false,
    });

    await newNote.save();
    res.status(201).json({ success: true, note: newNote });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update note
router.put("/:id", authenticateToken, async (req, res) => {

  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
    if (!note)
      return res.status(404).json({ success: false, message: "Note not found" });

    const { title, content, isPinned } = req.body;
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (isPinned !== undefined) note.isPinned = isPinned;

    await note.save();
    res.json({ success: true, note });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete note
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!note)
      return res.status(404).json({ success: false, message: "Note not found" });

    res.json({ success: true, message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Pin/unpin note
router.put("/pin/:id", authenticateToken, async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
    if (!note)
      return res.status(404).json({ success: false, message: "Note not found" });

    note.isPinned = !note.isPinned;
    await note.save();

    res.json({
      success: true,
      message: note.isPinned ? "Note pinned" : "Note unpinned",
      note,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
// 🔍 Search notes
router.get("/search", authenticateToken, async (req, res) => {
  try {
    const query = req.query.q?.trim();

    // If no search query provided, return all user's notes
    if (!query) {
      const notes = await Note.find({ userId: req.user.id }).sort({ updatedAt: -1 });
      return res.json({ success: true, notes });
    }

    // Case-insensitive match on title or content
    const notes = await Note.find({
      userId: req.user.id,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    }).sort({ updatedAt: -1 });

    res.json({ success: true, notes });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ success: false, message: "Search failed" });
  }
});

module.exports = router;

