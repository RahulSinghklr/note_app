const express = require("express");
const Note = require("../models/Note");
const router = express.Router();

// Create Note
router.post("/", async (req, res) => {
    try {
        const { user, title, content } = req.body;
        const newNote = new Note({ user, title, content });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Notes
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find().populate("user", "username email");
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Note
router.delete("/:id", async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
