import { Box, Typography, useTheme } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { GroupChip } from "../NewRequest/GroupChip";
import { formatAssignment, formatGroupName, fullDateFormat } from "../../utils";

export const RequestItem = ({ request, index }) => {
  const theme = useTheme();

  const { assignmentId: assignment, groupId: group, requestDate } = request;

  return (
    <Box
      component="li"
      sx={{
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxShadow: "1px 1px 4px 0 rgba(0, 0, 0, 0.24)",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: "0.5rem",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: "0.25rem" }}>
          <CheckCircle color="primary" />
          <Typography variant="h3" color="primary" fontWeight="bold">
            Solicitud creada
          </Typography>
        </Box>
        <GroupChip
          label={formatGroupName(index + 1, group.day, group.time)}
          selected
        />
      </Box>
      <Box
        sx={{
          borderRadius: "8px",
          backgroundColor: theme.palette.primary.translucid,
          display: "flex",
          flexDirection: "column",
          padding: "0.5rem",
          width: "100%",
        }}
      >
        <Typography color="primary" fontWeight="bold">
          {formatAssignment(assignment)}.
        </Typography>
        <Typography color="primary">
          <strong>Laboratorio:</strong> {group.lab}.
        </Typography>
        <Typography color="primary">
          <strong>Fecha:</strong> {fullDateFormat(requestDate)}.
        </Typography>
      </Box>
      {/* <Button variant="text" sx={{ fontWeight: "bold" }}>
        Ver detalles
      </Button> */}
    </Box>
  );
};
