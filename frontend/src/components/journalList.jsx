import JournalItem from "./JournalItem";

export default function JournalList({ notes, onEdit, onDelete }) {
  return (
    <div className="space-y-4">
        {notes.length === 0 ? (
          <p className="text-gray-500">Aucune note trouvée.</p>
        ) : (
          notes.map(note => {
            console.log(note);
            return (
              <JournalItem
                key={note._id}
                note={note}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            );
          })
        )}
    </div>
  );
}