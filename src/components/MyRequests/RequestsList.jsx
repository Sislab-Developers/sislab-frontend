import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Box, LinearProgress, Typography } from "@mui/material";

import { TextEmphasis } from "../TextEmphasis";
import { useRequestsByProfDate } from "../../hooks/useRequests";
import { RequestItem } from "./RequestItem";
import { useGroupsByPeriodData } from "../../hooks/useGroupsData";

export const RequestsList = ({ date, hasRequests }) => {
  const { groups, isLoading: groupsLoading } = useGroupsByPeriodData();
  const { requests, isLoading: requestsLoading } = useRequestsByProfDate(date);

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
          {(requestsLoading || groupsLoading) && <LinearProgress />}
          {!requestsLoading &&
            !groupsLoading &&
            requests
              .sort((reqA, reqB) => reqA.groupId.time - reqB.groupId.time)
              .map((request) => (
                <RequestItem
                  request={request}
                  index={groups.findIndex(
                    (group) => group._id === request.groupId._id
                  )}
                  key={request._id}
                />
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
