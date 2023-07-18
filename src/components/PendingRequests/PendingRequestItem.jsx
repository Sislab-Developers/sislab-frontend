import { useState } from "react";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { TextEmphasis } from "../TextEmphasis";
import { ArrowRight, ExpandMore } from "@mui/icons-material";
import {
  formatProfName,
  formatTime,
  fullDateFormat,
  fullDateTimeFormat,
} from "../../utils";

export const PendingRequestItem = ({ request }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    assignmentId: assignment,
    profId: prof,
    groupId: group,
    createdAt,
    requestDate,
    customReagents,
    customEquipment,
    customWaste,
  } = request;

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Box component="article" width="100%">
      <Card>
        <CardActionArea onClick={toggleExpanded}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "0.5rem",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            <Typography color="primary" fontWeight="bold">{`Práctica ${
              assignment.number
            } | ${group.laboratorio} | ${formatTime(group.hora)}`}</Typography>
            <ExpandMore
              color={isExpanded ? "default" : "primary"}
              sx={{
                transition: "transform 200ms linear, color 400ms linear",
                transform: `rotate(${isExpanded ? "180" : "0"}deg)`,
              }}
            />
          </Box>
          <Collapse in={isExpanded} unmountOnExit>
            <CardContent>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
              >
                <Typography>
                  <TextEmphasis>Creada por:</TextEmphasis>{" "}
                  {formatProfName(
                    prof.nombre,
                    prof.apellidoPaterno,
                    prof.apellidoMaterno
                  )}
                </Typography>
                <Typography>
                  <TextEmphasis>Fecha de creación:</TextEmphasis>{" "}
                  {fullDateTimeFormat(createdAt)}
                </Typography>
                <Typography>
                  <TextEmphasis>Práctica:</TextEmphasis>{" "}
                  {`Práctica ${assignment.number} | ${assignment.name}`}
                </Typography>
                <Typography>
                  <TextEmphasis>Carrera:</TextEmphasis> {group.carrera}
                </Typography>
                <Typography>
                  <TextEmphasis>Laboratorio:</TextEmphasis> {group.laboratorio}
                </Typography>
                <Typography>
                  <TextEmphasis>Día solicitado:</TextEmphasis>{" "}
                  {fullDateFormat(requestDate)}
                </Typography>
                <Typography>
                  <TextEmphasis>Hora de clase:</TextEmphasis>{" "}
                  {formatTime(group.hora)}
                </Typography>
                {customReagents.length > 0 && (
                  <>
                    <Typography>
                      <TextEmphasis>Reactivos extra:</TextEmphasis>
                    </Typography>
                    <List>
                      {customReagents.map((reagent) => (
                        <ListItem
                          key={`${reagent.reagent} ${reagent.quantity} ${reagent.unit}`}
                        >
                          <ListItemIcon>
                            <ArrowRight />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${reagent.reagent} - ${reagent.quantity}${reagent.unit}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
                {customEquipment.length > 0 && (
                  <>
                    <Typography>
                      <TextEmphasis>Reactivos extra:</TextEmphasis>
                    </Typography>
                    <List>
                      {customEquipment.map((equipment, index) => (
                        <ListItem key={`Equipment ${equipment} ${index}`}>
                          <ListItemIcon>
                            <ArrowRight />
                          </ListItemIcon>
                          <ListItemText primary={equipment} />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
                {customWaste.length > 0 && (
                  <>
                    <Typography>
                      <TextEmphasis>Reactivos extra:</TextEmphasis>
                    </Typography>
                    <List>
                      {customWaste.map((waste, index) => (
                        <ListItem
                          key={`Waste ${waste.residue} ${waste.treatment} ${index}`}
                        >
                          <ListItemIcon>
                            <ArrowRight />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${waste.residue} | ${waste.container} | Tratamiento: ${waste.treatment}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </Box>
            </CardContent>
          </Collapse>
        </CardActionArea>
      </Card>
    </Box>
  );
};
