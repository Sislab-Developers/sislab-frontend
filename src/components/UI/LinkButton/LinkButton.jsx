import { Link } from "react-router-dom";

import { useTheme } from "@mui/material";

export const LinkButton = ({ to, children, sx }) => {
  const theme = useTheme();

  return (
    <Link
      to={to}
      style={{
        display: "inline-block",
        backgroundColor: theme.palette.primary.main,
        padding: "0.5rem 2.25rem",
        borderRadius: "12px",
        textDecoration: "none",
        color: "white",
        ...sx,
      }}
    >
      {children}
    </Link>
  );
};
