import { useState, useEffect, use } from "react";

export default function JournalEntryForm({ onSubmit, currentNote, selectedDate }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [id, setId] = useState("");
    const [noteDate, setNoteDate] = useState(selectedDate || new Date());

    useEffect(() => {
        if (currentNote) {
            setTitle(currentNote.title);
            setContent(currentNote.content);
            setId(currentNote._id);
        } else {
            setTitle("");
            setContent("");
        }
    }, [currentNote]);

    useEffect(() => {
        if (!currentNote && selectedDate) {
            setNoteDate(selectedDate);
        }
    }
    , [selectedDate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !content) {
            alert("Veuillez remplir tous les champs.");
            return;
        }
        onSubmit({ title, content, date: noteDate, id: currentNote?._id });
        setTitle("");
        setContent("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" className="w-full p-2 border rounded" placeholder="Titre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                required
            />
            <textarea className="w-full p-2 border rounded" placeholder="Écrivez votre note ici..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                required
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                {currentNote ? "Modifier la note" : "Ajouter une note"}
            </button>
        </form>
    )
}