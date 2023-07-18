import { useState } from "react";

import { Box, CircularProgress } from "@mui/material";

import { Calendar } from "../Calendar/Calendar";

// import { RequestsList } from "./RequestsList";
import { useQuery } from "@tanstack/react-query";
import { getPendingRequests } from "../../api/fetch";
import { ErrorMessage } from "../ErrorMessage";
import { toast } from "react-hot-toast";
import { PendingRequestsList } from "./PendingRequestsList";

export const PendingRequests = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const requestsQuery = useQuery({
    queryKey: ["pending-requests"],
    queryFn: getPendingRequests,
  });

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
      <Calendar
        value={selectedDate}
        onChange={handleDateChange}
        disabled={requestsQuery.isLoading}
        shouldDisableDate={checkForRequestsOnDate}
      />
      {requestsQuery.isError && (
        <ErrorMessage>
          Ocurrió un error al obtener las solicitudes.
        </ErrorMessage>
      )}
      {requestsQuery.isSuccess && (
        <PendingRequestsList
          date={selectedDate}
          hasRequests={!checkForRequestsOnDate(selectedDate)}
        />
      )}
    </Box>
  );
};
