import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export const StyledAccordion = ({label, children}) => {
  return <Accordion
    sx={{my: "1rem", borderRadius: "12px", border: "1px solid #ccc"}}
  >
    <AccordionSummary expandIcon={<ExpandMore />}>
      <Typography variant="h2" sx={{fontSize: "1em", fontWeight: "bold"}}>
        {label}
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      {children}
    </AccordionDetails>
  </Accordion>;
};