export default function JournalItem({ title, content, date }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md mb-4">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-500 mb-2">{date}</p>
      <p className="text-gray-700">{content}</p>
    </div>
  );
}