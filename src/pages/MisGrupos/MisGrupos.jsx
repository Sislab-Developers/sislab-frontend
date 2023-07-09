import { Box, Typography } from "@mui/material";
import { MyGroups } from "../../components/MyGroups/MyGroups";
import { TextEmphasis } from "../../components/TextEmphasis";

import { currentSemester } from "../../utils";

export const MisGrupos = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: "0.5rem",
          justifyContent: { xs: "normal", sm: "space-between" },
        }}
      >
        <Typography variant="h1">
          Mis <TextEmphasis>grupos</TextEmphasis>
        </Typography>
        <Typography variant="h2">Semestre {currentSemester}</Typography>
      </Box>
      <MyGroups />
    </Box>
  );
};
