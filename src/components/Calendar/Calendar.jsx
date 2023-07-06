import { es } from "date-fns/locale";

import { useTheme } from "@mui/material";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const dayMap = {
  Domingo: 0,
  Lunes: 1,
  Martes: 2,
  Miércoles: 3,
  Jueves: 4,
  Viernes: 5,
  Sábado: 6,
};

export const Calendar = ({ value, groupDay, onChange, disabled = true }) => {
  const shouldDisableDate = (date) => date.getDay() !== dayMap[groupDay];

  return (
    <LocalizationProvider adapterLocale={es} dateAdapter={AdapterDateFns}>
      <DateCalendar
        disablePast
        views={["day"]}
        disabled={disabled}
        value={value || new Date()}
        onChange={onChange}
        shouldDisableDate={shouldDisableDate}
        slots={{ day: HighlightedDay }}
        sx={{ maxWidth: "100%" }}
      />
    </LocalizationProvider>
  );
};

const HighlightedDay = ({ day, disabled, ...other }) => {
  const theme = useTheme();

  if (disabled) {
    return <PickersDay day={day} disabled={disabled} {...other} />;
  }

  return (
    <PickersDay
      day={day}
      disabled={disabled}
      sx={{ border: `2px solid ${theme.palette.primary.main}` }}
      {...other}
    />
  );
};
