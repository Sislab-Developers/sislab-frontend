import React, { useState, useEffect } from 'react';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { startOfMonth } from 'date-fns';

const dayMapping = {
  Lunes: 1,
  Martes: 2,
  Miércoles: 3,
  Jueves: 4,
  Viernes: 5,
};

const currentDate = new Date();

export const Calendario = ({ dayName }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const shouldDisableDate = (date) => {
    const dayNumber = date.getDay();
    const selectedDayNumber = dayMapping[dayName];
    return dayNumber !== selectedDayNumber;
  };

  useEffect(() => {
    setSelectedDate(null);
  }, [dayName]);

  const minDate = startOfMonth(currentDate);
  const maxDate = new Date(currentDate.getFullYear(), 11, 31);

  return (
    <LocalizationProvider adapterLocale={es} dateAdapter={AdapterDateFns}>
      <DateCalendar
        views={['day']}
        value={selectedDate}
        onChange={handleDateChange}
        shouldDisableDate={shouldDisableDate}
        minDate={minDate}
        maxDate={maxDate}
      />
    </LocalizationProvider>
  );
};
