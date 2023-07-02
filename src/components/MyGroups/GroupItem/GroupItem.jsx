import { useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export const GroupItem = ({ group }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => setExpanded((prev) => !prev);

  return (
    <Accordion
      sx={{
        mx: "auto",
        width: "100%",
      }}
      disableGutters
      expanded={expanded}
      onChange={handleExpansion}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="body1">{group.nombre}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
          <Typography variant="h3">
            Laboratorio<i className="ri-information-line"></i>
          </Typography>
          <TextField
            required
            disabled
            name="laboratorio"
            label="Laboratorio"
            defaultValue={group.laboratorio}
          />

          <Typography variant="h3">
            Carrera<i className="ri-information-line"></i>
          </Typography>
          <TextField
            disabled
            required
            name="carrera"
            defaultValue={group.carrera}
            label="Carrera"
          />

          <Typography variant="h3">
            Materia<i className="ri-information-line"></i>
          </Typography>
          <TextField
            name="materia"
            disabled
            required
            defaultValue={group.materia}
            label="Materia"
          />

          <Typography variant="h3">
            Número de alumnos<i className="ri-information-line"></i>
          </Typography>
          <TextField
            name="alumnos"
            type="number"
            required
            disabled
            defaultValue={group.alumnos || ""}
            label="Alumnos"
          />

          <Typography variant="h3">
            Número de equipos<i className="ri-information-line"></i>
          </Typography>
          <TextField
            name="equipos"
            type="number"
            required
            disabled
            defaultValue={group.equipos || ""}
            label="Equipos"
          />

          <Typography variant="h3">
            Día de la semana<i className="ri-information-line"></i>
          </Typography>
          <TextField
            required
            disabled
            name="dia"
            defaultValue={group.dia}
            label="Día de la semana"
          />

          <Typography variant="h3">
            Hora de clase<i className="ri-information-line"></i>
          </Typography>
          <TextField
            required
            name="hora"
            disabled
            defaultValue={group.hora}
            label="Hora"
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
