function NoteTag({ note, onEditNote, onDeleteNote }) {
  return (
    <div
      className="group relative bg-blue-200 text-blue-800 text-xs px-2 py-0.5 rounded-l-full truncate cursor-pointer"
      onClick={() => onEditNote(note)}
    >
      {note.title}
      <button
        className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-800 text-sm ml-2"
        onClick={(e) => {
          e.stopPropagation(); // Empêche le déclenchement de onEditNote
          onDeleteNote(note._id);
        }}
        title="Supprimer"
      >
        ×
      </button>
    </div>
  );
}

export default NoteTag;
