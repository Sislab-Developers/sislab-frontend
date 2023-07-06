import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

export const RequestStep = ({
  expanded = false,
  onChange,
  stepLabel,
  children,
}) => {
  return (
    <Accordion expanded={expanded} onChange={onChange}>
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
