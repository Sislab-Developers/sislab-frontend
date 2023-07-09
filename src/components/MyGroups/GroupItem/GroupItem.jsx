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
import { days, formatGroupName, formatTime } from "../../../utils";
import { TextEmphasis } from "../../TextEmphasis";
import { InfoLabel } from "../../InfoLabel/InfoLabel";

export const GroupItem = ({ group, index }) => {
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
        <Typography>
          <TextEmphasis>
            {formatGroupName(index, group.dia, group.hora)}
          </TextEmphasis>
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
          <InfoLabel tooltip="El laboratorio asignado a este grupo.">
            Laboratorio
          </InfoLabel>
          <TextField
            required
            disabled
            name="laboratorio"
            label="Laboratorio"
            defaultValue={group.laboratorio}
          />

          <InfoLabel tooltip="La carrera a la que pertenece el grupo.">
            Carrera
          </InfoLabel>
          <TextField
            disabled
            required
            name="carrera"
            defaultValue={group.carrera}
            label="Carrera"
          />

          <InfoLabel tooltip="La materia asignada al grupo.">Materia</InfoLabel>
          <TextField
            name="materia"
            disabled
            required
            defaultValue={group.materia}
            label="Materia"
          />

          <InfoLabel tooltip="El número de alumnos del grupo.">
            Número de alumnos
          </InfoLabel>
          <TextField
            name="alumnos"
            type="number"
            required
            disabled
            defaultValue={group.alumnos || ""}
            label="Alumnos"
          />

          <InfoLabel tooltip="El número de equipos que tendrá el grupo.">
            Número de equipos
          </InfoLabel>
          <TextField
            name="equipos"
            type="number"
            required
            disabled
            defaultValue={group.equipos || ""}
            label="Equipos"
          />

          <InfoLabel tooltip="El día de la semana en el que se da la clase.">
            Día de la semana
          </InfoLabel>
          <TextField
            required
            disabled
            name="dia"
            defaultValue={days[group.dia]}
            label="Día de la semana"
          />

          <InfoLabel tooltip="La hora del día a la que se da la clase.">
            Hora de clase
          </InfoLabel>
          <TextField
            required
            name="hora"
            disabled
            defaultValue={formatTime(group.hora)}
            label="Hora"
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
