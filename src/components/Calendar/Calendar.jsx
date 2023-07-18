import { es } from "date-fns/locale";

import { alpha, useTheme } from "@mui/material";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export const Calendar = ({
  value,
  onChange,
  shouldDisableDate,
  disablePast = false,
  disabled = false,
}) => {
  const theme = useTheme();

  return (
    <LocalizationProvider adapterLocale={es} dateAdapter={AdapterDateFns}>
      <DateCalendar
        disablePast={disablePast}
        views={["day"]}
        disabled={disabled}
        value={value || new Date()}
        onChange={onChange}
        shouldDisableDate={shouldDisableDate}
        slots={{ day: HighlightedDay }}
        sx={{
          maxWidth: "100%",
          border: `1px ${
            disabled ? "rgba(0, 0, 0, 0.26)" : theme.palette.primary.main
          } solid`,
          borderRadius: "8px",
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
        }}
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
      sx={{
        backgroundColor: `${theme.palette.secondary.main}`,
        color: "white",
        "&:hover": {
          backgroundColor: `${theme.palette.secondary.main}`,
          opacity: 0.8,
        },
        "&:focus": {
          backgroundColor: `${theme.palette.secondary.main}`,
          opacity: 1,
        },
      }}
      {...other}
    />
  );
};
