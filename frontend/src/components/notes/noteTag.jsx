function noteTag(note) {
  console.log("Rendering note tag inner:", note.note);
  return (
    <div className="bg-blue-200 text-blue-800 text-xs px-2 py-0.5 rounded-l-full truncate" key={note.note._id}>
        {note.note.title}
    </div>
  );
}

export default noteTag;