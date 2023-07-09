import { Typography } from "@mui/material";

export const ErrorMessage = ({ children }) => {
  return (
    <Typography color="error">
      <i style={{ color: "inherit" }} className="ri-error-warning-line" />{" "}
      {children}
    </Typography>
  );
};
