// const notes = require('../data/notes');
const Note = require('../models/notesModel');

exports.getNotes = async (req, res) => {
  // console.log(notes);
  const notes = await Note.find();
  res.json(notes);
};

exports.addNote = async (req, res) => {
  const { title, content, noteDate } = req.body;
  if (!title || !content || !noteDate) {
    return res.status(400).json({ error: 'Title, content, and date are required' });
  }

  // console.log('Adding note:', { title, content, noteDate });

  try {
    const newNote = new Note({
      title,
      content,
      noteDate: new Date(noteDate),
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
exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, noteDate } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Note ID is required' });
  }

  const note = await Note.findById(id);

  if (!title || !content || !noteDate) {
    return res.status(400).json({ error: 'Title, content, and date are required' });
  }

  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  const updatedNote = await Note.findByIdAndUpdate(id, { title, content, noteDate, updatedAt: new Date() }, { new: true })
    .then(updatedNote => {
      if (!updatedNote) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.json(updatedNote);
    })
    .catch(error => {
      console.error('Error updating note:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
  
  res.json(updatedNote);
}

exports.deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Note ID is required' });
  }

  const note = await Note.findByIdAndDelete(id);
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }
  res.status(204).send();
}
