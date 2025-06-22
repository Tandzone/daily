import { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay } from "date-fns";

export default function CalendarView({ onDateSelect, selectedDate }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const renderHeader = () => (
        <div className="flex justify-between items-center mb-4">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="text-gray-500 hover:text-gray-700">
                &lt; Précédent
            </button>
            <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="text-gray-500 hover:text-gray-700">
                Suivant &gt;
            </button>
        </div>
    );

    const renderDaysOfWeek = () => {
        const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
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
            days.push(
                <div
                    key={day}
                    className={`p-2 text-center cursor-pointer ${isSameDay(day, selectedDate) ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"}`}
                    onClick={() => onDateSelect(day)}
                >
                    {format(day, "d")}
                </div>
            );
        }

        return <div className="grid grid-cols-7 gap-1">{days}</div>;
    };

    return (
        <div className="p-4 bg-gray-400 rounded-lg shadow-md">
            {renderHeader()}
            {renderDaysOfWeek()}
            {renderCells()}
        </div>
    );
}