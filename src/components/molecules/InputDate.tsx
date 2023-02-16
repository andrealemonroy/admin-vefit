import { useState, useRef } from 'react';
import Calendar from './Calendar';

type InputDateProps = {
  label: string;
  value?: Date;
  onChange: (date: Date | null) => void;
  setFormValue: (value: any) => void;
};

export const InputDate: React.FC<InputDateProps> = ({
  label,
  value,
  onChange,
  setFormValue,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setShowCalendar(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = event.target.value;

    if (dateString) {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        setFormValue(date);
      } else {
        setFormValue(null);
      }
    } else {
      setFormValue(null);
    }
  };

  const handleInputFocus = () => {
    setShowCalendar(true);
  };

  const handleSelectDate = (date: Date) => {
    setFormValue(date);
    setShowCalendar(false);
  };

  const inputDate = value ? value.toISOString().substr(0, 10) : '';

  return (
    <div className="flex flex-col">
      <label className="text-sm mb-2">{label}</label>
      <div className="relative">
        <input
          type="date"
          className="border border-gray-300 rounded-md py-1 px-2 w-full"
          value={inputDate}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          ref={inputRef}
        />
        {showCalendar && (
          <div className="absolute top-full left-0 z-10">
            <Calendar
              date={value ?? new Date()}
              onSelectDate={handleSelectDate}
            />
          </div>
        )}
      </div>
    </div>
  );
};
