import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Box, Skeleton, Typography } from "@mui/material";

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
          {(requestsLoading || groupsLoading) && <RequestSkeleton />}
          {!requestsLoading &&
            !groupsLoading &&
            requests.map((request) => (
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

const RequestSkeleton = () => {
  return Array.from(Array(3).keys()).map((i) => (
    <Skeleton
      key={i}
      variant="rectangular"
      animation="pulse"
      sx={{
        width: "100%",
        height: "150px",
        animationDelay: `${i * 0.08}s`,
        animationDuration: "1s",
      }}
    />
  ));
};
