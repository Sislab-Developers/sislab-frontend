import { Typography } from "@mui/material";

export const ErrorMessage = ({ children }) => {
  return (
    <Typography color="#eb4034">
      <i style={{ color: "#eb4034" }} className="ri-error-warning-line" />{" "}
      {children}
    </Typography>
  );
};
