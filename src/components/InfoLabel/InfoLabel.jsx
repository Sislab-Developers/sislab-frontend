import { Tooltip, Typography, useTheme } from "@mui/material";

export const InfoLabel = ({ tooltip, children }) => {
  const theme = useTheme();

  return (
    <Typography>
      {children}{" "}
      {tooltip && (
        <Tooltip title={tooltip}>
          <i
            className="ri-information-line"
            style={{ color: theme.palette.primary.main }}
          />
        </Tooltip>
      )}
    </Typography>
  );
};
