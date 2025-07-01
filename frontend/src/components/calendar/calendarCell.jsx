import {format, isSameDay } from "date-fns";
import NoteTag from "../notes/noteTag";

export default function CalendarCell({ day, selectedDate, onDateSelect, notesForDay }) {
    return (
        <div className={`relative p-1 border h-24 w-full bg-white text-left text-sm ${isSameDay(day, selectedDate) ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => onDateSelect(day)}>
                <div className="absolute top-1 left-1 text-xs text-gray-500 font-semibold">
                    {format(day, 'd')}
                </div>
                <div className="mt-5 space-y-1 overflow-hidden">
                    { notesForDay && notesForDay.length > 0 ? (
                        notesForDay.map((note) => (
                            console.log("Rendering note tag:", note),
                            <NoteTag key={note._id} note={note} />
                        ))
                    ) : null}
                </div>
        </div>
    );
}