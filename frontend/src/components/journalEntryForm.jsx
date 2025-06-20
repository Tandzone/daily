import { useState, useEffect } from "react";

export default function JournalEntryForm({ onSubmit, currentNote }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (currentNote) {
            setTitle(currentNote.title);
            setContent(currentNote.content);
        } else {
            setTitle("");
            setContent("");
        }
    }, [currentNote]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !content) {
            alert("Veuillez remplir tous les champs.");
            return;
        }
        onSubmit({ title, content, id: currentNote?.id });
        setTitle("");
        setContent("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" className="w-full p-2 border rounded" placeholder="Titre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea className="w-full p-2 border rounded" placeholder="Écrivez votre note ici..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                {currentNote ? "Modifier la note" : "Ajouter une note"}
            </button>
        </form>
    )
}