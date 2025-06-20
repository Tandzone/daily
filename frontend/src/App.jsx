import { useState, useEffect } from 'react';
import JournalEntryForm from './components/journalEntryForm';
import JournalList from './components/journalList';
import { getNotes, createNote, updateNote, deleteNote } from './api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    async function fetchNotes() {
      const data = await getNotes();
      console.log(data);
      setNotes(data);
    }
    fetchNotes();
  }, []);

  const handleSaveNote = async (note) => {
    if (note.id) {
      const updatedNote = await updateNote(note.id, note);
      setNotes((prev) => prev.map(n => n._id === updatedNote.id ? updatedNote : n));
    } else {
      const newNote = await createNote(note);
      setNotes((prev) => [...prev, newNote]);
    }

    setEditingNote(null);
  }

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    setNotes((prev) => prev.filter(note => note._id !== id));
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Journal de Bord</h1>
      <JournalEntryForm
        onSubmit={handleSaveNote}
        currentNote={editingNote}
      />
      <JournalList
        notes={notes}
        onEdit={setEditingNote}
        onDelete={handleDeleteNote}
      />
    </div>
  );
}

export default App
