import { useState, useEffect } from 'react';
import JournalEntryForm from './components/journalEntryForm';
import JournalList from './components/journalList';
import { getNotes, createNote, updateNote, deleteNote } from './api/notes';
import Modal from './components/modal';

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

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

  const handleAddNoteClick = () => {
    setEditingNote({ title: '', content: '' });
    setIsModalOpen(true);
  }

  const handleEditNoteClick = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Journal de Bord</h1>
      <button
        onClick={handleAddNoteClick}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      > Ajouter une note </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <JournalEntryForm
          onSubmit={handleSaveNote}
          currentNote={editingNote}
        />
      </Modal>
      <h2 className="text-xl font-semibold mb-2">Mes Notes</h2>
      <JournalList
        notes={notes}
        onEdit={handleEditNoteClick}
        onDelete={handleDeleteNote}
      />
    </div>
  );
}

export default App
