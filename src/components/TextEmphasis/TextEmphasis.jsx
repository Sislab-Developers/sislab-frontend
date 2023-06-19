import { useTheme } from "@mui/material";

export const TextEmphasis = ({color, children}) => {
  const theme = useTheme();

  return (
    <span
      style={{color: color || theme.palette.primary.main, fontWeight: "bold"}}
    >
      {children}
    </span>
  );
};
