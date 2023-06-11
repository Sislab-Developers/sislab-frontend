import { Box, useTheme } from "@mui/material";

export const SafeArea = ({ children, sx }) => {
  const theme = useTheme();

  return (
    <Box sx={{ p: "1rem", maxWidth: theme.maxWidth, mx: "auto", ...sx }}>
      {children}
    </Box>
  );
};
