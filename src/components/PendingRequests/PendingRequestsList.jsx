import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Box, Button, LinearProgress, Typography } from "@mui/material";

import { TextEmphasis } from "../TextEmphasis";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequestsByDate } from "../../api/fetch";
import { toast } from "react-hot-toast";
import { ErrorMessage } from "../ErrorMessage";
import { PendingRequestItem } from "./PendingRequestItem";
import { useState } from "react";
import { PDFModal } from "../PDFModal/PDFModal";

export const PendingRequestsList = ({ date, hasRequests }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const requestsQuery = useQuery({
    queryKey: ["requests", "admin", date],
    queryFn: () => getRequestsByDate(date),
  });

  if (requestsQuery.isLoading) {
    return <LinearProgress />;
  }

  const closeModal = () => setOpen(false);

  if (requestsQuery.isError) {
    toast.error("Ocurrió un error al obtener las solicitudes.");
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <ErrorMessage>
          Ocurrió un error al obtener las solicitudes.
        </ErrorMessage>
      </Box>
    );
  }

  if (requestsQuery.isSuccess) {
    queryClient.invalidateQueries(["pending-requests"]);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {hasRequests ? (
        <>
          <Typography>
            Estas son las <TextEmphasis>solicitudes</TextEmphasis> para el día{" "}
            <TextEmphasis>
              {format(date, "EEEE dd 'de' MMMM 'del' yyyy", { locale: es })}
            </TextEmphasis>
            :
          </Typography>
          {requestsQuery.data.requests.map((request) => (
            <PendingRequestItem request={request} key={request._id} />
          ))}
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{ mt: "1rem", mx: { sm: "auto" } }}
          >
            Imprimir todo
          </Button>
          <PDFModal
            isOpen={open}
            onClose={closeModal}
            requests={requestsQuery.data.requests}
            date={date}
          />
        </>
      ) : (
        <Typography>
          No se encontraron <TextEmphasis>solicitudes</TextEmphasis> para este
          día.
        </Typography>
      )}
    </Box>
  );
};
