import { es } from "date-fns/locale";

import { alpha, useTheme } from "@mui/material";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { isSameWeek } from "date-fns";
import { useState } from "react";

es.options.weekStartsOn = 0;

const customPickersDayStyles = (theme, isSelected, isHovered, day) => ({
  borderRadius: 0,
  ...(isHovered && {
    backgroundColor: theme.palette.primary.translucid,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.translucid,
    },
  }),
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(day.getDay() === 0 && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(day.getDay() === 6 && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
});

const isInSameWeek = (dayA, dayB) => {
  if (!dayA || !dayB) {
    return false;
  }

  return isSameWeek(dayA, dayB);
};

export const Calendar = ({
  value,
  onChange,
  shouldDisableDate,
  weekSelection = false,
  disablePast = false,
  disabled = false,
}) => {
  const theme = useTheme();

  const [hoveredDay, setHoveredDay] = useState(new Date());

  return (
    <LocalizationProvider adapterLocale={es} dateAdapter={AdapterDateFns}>
      <DateCalendar
        disablePast={disablePast}
        displayWeekNumber
        showDaysOutsideCurrentMonth
        views={["day"]}
        disabled={disabled}
        value={value || new Date()}
        onChange={onChange}
        shouldDisableDate={shouldDisableDate}
        slots={{ day: weekSelection ? WeekPickersDay : HighlightedDay }}
        slotProps={
          weekSelection && {
            day: (ownerState) => ({
              selectedDay: value || new Date(),
              hoveredDay,
              onPointerEnter: () => setHoveredDay(ownerState.day),
              onPointerLeave: () => setHoveredDay(null),
            }),
          }
        }
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

const WeekPickersDay = ({
  day,
  disabled,
  selectedDay,
  hoveredDay,
  ...other
}) => {
  const isSelected = isInSameWeek(day, selectedDay);
  const isHovered = isInSameWeek(day, hoveredDay);

  if (disabled) {
    return (
      <PickersDay
        day={day}
        {...other}
        sx={(theme) => ({
          px: 2.5,
          ...customPickersDayStyles(theme, isSelected, isHovered, day),
        })}
        disableMargin={true}
        selected={false}
      />
    );
  }

  return (
    <PickersDay
      day={day}
      {...other}
      sx={(theme) => ({
        px: 2.5,
        ...customPickersDayStyles(theme, isSelected, isHovered, day),
        backgroundColor: `${theme.palette.secondary.main}`,
        color: "white",
      })}
      disableMargin={true}
      selected={false}
    />
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
