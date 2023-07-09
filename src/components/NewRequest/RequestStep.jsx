import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  useTheme,
} from "@mui/material";

export const RequestStep = ({
  expanded = false,
  stepLabel,
  done = false,
  error = false,
  onChange,
  children,
}) => {
  const theme = useTheme();

  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      sx={{
        border: error
          ? `1px solid ${theme.palette.error.main}`
          : done
          ? `1px solid ${theme.palette.primary.main}`
          : `1px solid #ccc`,
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{stepLabel}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};
