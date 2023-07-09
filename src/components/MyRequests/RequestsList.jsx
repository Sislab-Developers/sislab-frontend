import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Box, Typography } from "@mui/material";

import { TextEmphasis } from "../TextEmphasis";
import { useRequestsByProfDate } from "../../hooks/useRequests";
import { RequestItem } from "./RequestItem";

export const RequestsList = ({ date, hasRequests }) => {
  const { requests, isLoading } = useRequestsByProfDate(date);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {hasRequests ? (
        <>
          <Typography>
            Estas son tus <TextEmphasis>solicitudes</TextEmphasis> para el día{" "}
            <TextEmphasis>
              {format(date, "EEEE dd 'de' MMMM 'del' yyyy", { locale: es })}
            </TextEmphasis>
            :
          </Typography>
          {!isLoading &&
            requests.map((request) => (
              <RequestItem request={request} key={request._id} />
            ))}
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
