import {format, isSameDay } from "date-fns";
import NoteTag from "../notes/noteTag";

export default function CalendarCell({ day, selectedDate, onDateSelect, onEditNote, onDeleteNote, notesForDay }) {
    return (
        <div className={`relative p-1 border min-h-24 w-full bg-white text-left text-sm ${isSameDay(day, selectedDate) ? 'ring-2 ring-blue-500' : ''}`}>
                <div className="absolute top-0 left-0 w-full h-full bg-sky-950" onClick={() => onDateSelect(day)}></div>
                <div className="absolute top-1 left-1 text-xs text-white font-semibold">
                    {format(day, 'd')}
                </div>
                <div className="mt-5 space-y-1 overflow-hidden relative">
                    { notesForDay && notesForDay.length > 0 ? (
                        notesForDay.map((note) => (
                            <NoteTag key={note._id} note={note} onEditNote={onEditNote} onDeleteNote={onDeleteNote} />
                        ))
                    ) : null}
                </div>
        </div>
    );
}