const express = require('express');
const router = express.Router();

let notes = [];

router.get('/', (req, res) => {
  res.json(notes);
});

router.post('/', (req, res) => {
  const {title, content} = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newNote = {
    id: Date.now().toString(),
    title,
    content,
    createdAt: new Date()
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});

module.exports = router;
// This code defines a simple Express router for handling notes.
// It allows you to get all notes and create a new note with a title and content.