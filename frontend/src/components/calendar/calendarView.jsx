import { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay } from "date-fns";
import CalendarCell from "./calendarCell";

export default function CalendarView({ notes, onDateSelect, selectedDate, onEditNote, onDeleteNote }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const notesForDay = (day) => {
        //console.log("Filtering notes for day:", day, note);
        return notes.filter(note => isSameDay(new Date(note.noteDate), day));
    };


    const renderHeader = () => (
        <div className="flex justify-between items-center mb-4">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="text-white hover:text-gray-700">
                &lt; Previous
            </button>
            <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="text-white hover:text-gray-700">
                Next &gt;
            </button>
        </div>
    );

    const renderDaysOfWeek = () => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return (
            <div className="grid grid-cols-7 gap-1 mb-2">
                {days.map((day, index) => (
                    <div key={index} className="font-semibold text-gray-700 text-center">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const start = startOfWeek(startOfMonth(currentMonth));
        const end = endOfWeek(endOfMonth(currentMonth));
        const days = [];

        for (let day = start; day <= end; day = addDays(day, 1)) {
            /* days.push(
                <div
                    key={day}
                    className={`p-2 text-center cursor-pointer ${isSameDay(day, selectedDate) ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"}`}
                    onClick={() => onDateSelect(day)}
                >
                    {format(day, "d")}
                </div>
            ); */
            days.push(
                <CalendarCell
                    key={day}
                    day={day}
                    selectedDate={selectedDate}
                    onDateSelect={onDateSelect}
                    notesForDay={notesForDay(day)}
                    onEditNote={onEditNote}
                    onDeleteNote={onDeleteNote}
                />
            );
        }

        return <div className="grid grid-cols-7 gap-1">{days}</div>;
    };

    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));

    return (
        <div className="p-4 bg-gray-400 rounded-lg shadow-md">
            {renderHeader()}
            {renderDaysOfWeek()}
            {renderCells()}
        </div>
    );
}