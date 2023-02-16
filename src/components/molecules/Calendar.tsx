import { useState } from "react";
import { format, addMonths, subMonths, isSameDay } from "date-fns";

type CalendarProps = {
  date: Date;
  selectedDate?: Date;
  onSelectDate?: (date: Date) => void;
};

const Calendar: React.FC<CalendarProps> = ({ date, selectedDate, onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState(date);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const monthDays = [] as (Date | null)[];

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

  for (let i = startOfMonth.getDay(); i > 0; i--) {
    monthDays.push(null);
  }

  for (let i = 1; i <= endOfMonth.getDate(); i++) {
    monthDays.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  const calendar = [] as JSX.Element[];

  for (let i = 0; i < monthDays.length; i += 7) {
    const week = monthDays.slice(i, i + 7);

    calendar.push(
      <div className="flex justify-center" key={i}>
        {week.map((day, index) => {
          if (day) {
            const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;

            return (
              <div
                className={`text-center w-8 h-8 rounded-full mx-1 mt-1 px-1 py-1 hover:bg-gray-200 cursor-pointer ${
                  isSelected ? "bg-blue-500 text-white" : ""
                }`}
                key={index}
                onClick={() => onSelectDate?.(day)}
              >
                {format(day, "d")}
              </div>
            );
          } else {
            return <div className="w-8 h-8 mx-1 mt-1" key={index}></div>;
          }
        })}
      </div>
    );
  }

  return (
    <div className="max-w-xs bg-white shadow rounded p-4">
      <div className="flex justify-between mb-2">
        <button onClick={prevMonth} className="px-2 py-1 bg-gray-300 rounded-full hover:bg-gray-400 focus:outline-none">
          Prev
        </button>
        <h1 className="text-lg font-bold">{format(currentMonth, "MMMM yyyy")}</h1>
        <button onClick={nextMonth} className="px-2 py-1 bg-gray-300 rounded-full hover:bg-gray-400 focus:outline-none">
          Next
        </button>
      </div>
      <div className="mb-4">{calendar}</div>
      <div className="flex">
        {weekdays.map((day, index) => (
          <div className="text-center w-8 h-8 mx-1" key={index}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
