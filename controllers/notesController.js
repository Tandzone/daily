const notes = require('../data/notes');

exports.getNotes = (req, res) => {
  res.json(notes);
};

exports.addNote = (req, res) => {
  const { title, content } = req.body;
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
}
