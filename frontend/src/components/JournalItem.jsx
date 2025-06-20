export default function JournalItem({ note, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <h2 className="text-xl font-semibold">{ note.title }</h2>
      <p className="text-gray-700">{note.content}</p>
      <div className="flex justify-end gap-2 mt-4">
        <button className="text-blue-500 hover:underline"
          onClick={() => onEdit(note)}
        >
          Modifier
        </button>
        <button className="text-red-500 hover:underline"
          onClick={() => onDelete(note._id)}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}