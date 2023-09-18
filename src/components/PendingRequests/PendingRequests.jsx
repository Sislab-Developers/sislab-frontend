import { useState } from "react";

import { Box, CircularProgress, FormControlLabel, Switch } from "@mui/material";

import { Calendar } from "../Calendar/Calendar";

import { useQuery } from "@tanstack/react-query";
import { getPendingRequests } from "../../api/fetch";
import { ErrorMessage } from "../ErrorMessage";
import { toast } from "react-hot-toast";
import {
  PendingRequestsByRange,
  PendingRequestsList,
} from "./PendingRequestsList";
import { endOfWeek, startOfWeek } from "date-fns";

export const PendingRequests = () => {
  const [weekSelection, setWeekSelection] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const requestsQuery = useQuery({
    queryKey: ["pending-requests"],
    queryFn: getPendingRequests,
  });

  const handleSelectionChange = () => {
    setWeekSelection((prev) => !prev);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const checkForRequestsOnDate = (date) => {
    return !requestsQuery.data?.requests?.some((request) => {
      const requestDate = new Date(request.requestDate);

      return (
        requestDate.getDate() === date.getDate() &&
        requestDate.getMonth() === date.getMonth() &&
        requestDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const checkForRequestsOnWeek = (date) => {
    const start = startOfWeek(date);
    const end = endOfWeek(date);

    return !requestsQuery.data?.requests?.some((request) => {
      const requestDate = new Date(request.requestDate);

      return requestDate >= start && requestDate <= end;
    });
  };

  if (requestsQuery.isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (requestsQuery.isError) {
    toast.error("Ocurrió un error al obtener las solicitudes.");
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <FormControlLabel
        control={
          <Switch value={weekSelection} onChange={handleSelectionChange} />
        }
        label="Solicitudes por semana"
        sx={{ mx: "auto" }}
      />
      <Calendar
        value={selectedDate}
        onChange={handleDateChange}
        disabled={requestsQuery.isLoading}
        shouldDisableDate={checkForRequestsOnDate}
        weekSelection={weekSelection}
      />
      {requestsQuery.isError && (
        <ErrorMessage>
          Ocurrió un error al obtener las solicitudes.
        </ErrorMessage>
      )}
      {requestsQuery.isSuccess && weekSelection ? (
        <PendingRequestsByRange
          date={selectedDate}
          hasRequests={checkForRequestsOnWeek}
        />
      ) : (
        <PendingRequestsList
          date={selectedDate}
          hasRequests={!checkForRequestsOnDate(selectedDate)}
        />
      )}
    </Box>
  );
};
