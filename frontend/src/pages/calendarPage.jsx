import { useState, useEffect } from "react";
import JournalEntryForm from "../components/notes/journalEntryForm";
import JournalList from "../components/notes/journalList";
import { getNotes, createNote, updateNote, deleteNote } from "../api/notes";
import Modal from "../components/UI/modal";
import CalendarView from "../components/calendar/calendarView";

export default function CalendarPage() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        async function fetchNotes() {
            const data = await getNotes();
            setNotes(data);
        }
        fetchNotes();
    }, []);

    const handleSaveNote = async (note) => {
        if (note.id) {
            const updatedNote = await updateNote(note.id, note);
            setNotes((prev) => prev.map(n => n._id === note.id ? updatedNote : n));
        } else {
            const newNote = await createNote(note);
            setNotes((prev) => [...prev, newNote]);
        }

        handleCloseModal();
    }

    const handleDeleteNote = async (id) => {
        await deleteNote(id);
        setNotes((prev) => prev.filter(note => note._id !== id));
    }

    const handleAddNoteClick = (date) => {
        // console.log("Adding note for date:", date);
        setEditingNote({ title: '', content: '', noteDate: date });
        setIsModalOpen(true);
    }

    const handleEditNoteClick = (note) => {
        // console.log("Editing note:", note);
        setEditingNote(note);
        setSelectedDate(new Date(note.noteDate));
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingNote(null);
    }
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-8xl text-white tracking-tighter text-balance my-24">Daily Notes</h1>
            {/* <button
                onClick={() => handleAddNoteClick(new Date())}
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Ajouter une note
            </button> */}
            <CalendarView
                notes={notes}
                onDateSelect={(date) => {
                    setSelectedDate(date);
                    handleAddNoteClick(date);
                }}
                onEditNote={handleEditNoteClick}
                selectedDate={new Date()}
                onDeleteNote={handleDeleteNote}
            />
            {/* <JournalList
                notes={notes}
                onEdit={handleEditNoteClick}
                onDelete={handleDeleteNote}
            /> */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <JournalEntryForm
                    onSubmit={handleSaveNote}
                    currentNote={editingNote}
                    selectedDate={selectedDate}
                />
            </Modal>
            
        </div>
    );
}
