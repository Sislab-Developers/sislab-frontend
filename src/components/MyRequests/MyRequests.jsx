import { useState } from "react";

import { Box, LinearProgress } from "@mui/material";

import { Calendar } from "../Calendar/Calendar";

import { RequestsList } from "./RequestsList";

import { useRequestsByProf } from "../../hooks/useRequests";

export const MyRequests = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { requests, isLoading } = useRequestsByProf();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const checkForRequestsOnDate = (date) => {
    return !requests.some((request) => {
      const requestDate = new Date(request.requestDate);

      return (
        requestDate.getDate() === date.getDate() &&
        requestDate.getMonth() === date.getMonth() &&
        requestDate.getFullYear() === date.getFullYear()
      );
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {isLoading && <LinearProgress />}
      <Calendar
        value={selectedDate}
        onChange={handleDateChange}
        disabled={isLoading}
        shouldDisableDate={checkForRequestsOnDate}
      />
      <RequestsList
        date={selectedDate}
        hasRequests={!checkForRequestsOnDate(selectedDate)}
      />
    </Box>
  );
};
