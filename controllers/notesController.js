// const notes = require('../data/notes');
const Note = require('../models/notesModel');

exports.getNotes = async (req, res) => {
  // console.log(notes);
  const notes = await Note.find();
  res.json(notes);
};

exports.addNote = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const newNote = new Note({
      title,
      content,
      createdAt: new Date()
    });
    
    await newNote.save();
    res.status(201).json(newNote);
  }
  catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/** à vérifier */
exports.updateNote = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Note ID is required' });
  }

  const note = Note.find(note => note.id === id);
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  note.title = title;
  note.content = content;
  note.updatedAt = new Date();
  Note.save(note);
  res.json(note);
}

exports.deleteNote = (req, res) => {
  const { id } = req.params;

  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  notes.splice(noteIndex, 1);
  res.status(204).send();
}

exports.getNoteById = (req, res) => {
  const { id } = req.params;
  const note = notes.find(note => note.id === id);
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }
  res.json(note);
}
