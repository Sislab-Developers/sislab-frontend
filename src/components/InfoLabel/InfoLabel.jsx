import { Tooltip, Typography } from "@mui/material";

export const InfoLabel = ({ tooltip, children }) => {
  return (
    <Typography>
      {children}{" "}
      {tooltip && (
        <Tooltip title={tooltip}>
          <i className="ri-information-line" />
        </Tooltip>
      )}
    </Typography>
  );
};
