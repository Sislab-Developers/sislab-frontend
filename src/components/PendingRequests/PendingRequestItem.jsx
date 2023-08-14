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
  formatTimeslot,
  fullDateFormat,
  fullDateTimeFormat,
  replaceWithUnicode,
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
    omittedReagents,
    comments,
  } = request;

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Box component="article" width="100%">
      <Card
        sx={{
          border: "1px solid #ccc",
          boxShadow: "1px 1px 4px 0 rgba(0, 0, 0, 0.24)",
        }}
      >
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
            } | ${group.lab} | ${formatTimeslot(group.time)}`}</Typography>
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
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>
                  <TextEmphasis>Creada por:</TextEmphasis>{" "}
                  {formatProfName(prof?.name, prof?.surname)}
                </Typography>
                <Typography>
                  <TextEmphasis>Fecha de creación:</TextEmphasis>{" "}
                  {fullDateTimeFormat(createdAt)}
                </Typography>
                <Typography>
                  <TextEmphasis>Práctica:</TextEmphasis>{" "}
                  {`Práctica ${assignment?.number} | ${assignment?.name}`}
                </Typography>
                <Typography>
                  <TextEmphasis>Carrera:</TextEmphasis> {group?.career}
                </Typography>
                <Typography>
                  <TextEmphasis>Laboratorio:</TextEmphasis> {group?.lab}
                </Typography>
                <Typography>
                  <TextEmphasis>Día solicitado:</TextEmphasis>{" "}
                  {fullDateFormat(requestDate)}
                </Typography>
                <Typography>
                  <TextEmphasis>Hora de clase:</TextEmphasis>{" "}
                  {formatTimeslot(group?.time)}
                </Typography>
                {omittedReagents.length > 0 && (
                  <>
                    <Typography>
                      <TextEmphasis>Reactivos omitidos:</TextEmphasis>
                    </Typography>
                    <List disablePadding>
                      {omittedReagents.map((reagent, index) => (
                        <ListItem
                          disablePadding
                          key={`${reagent.reagent} ${reagent.quantity} ${reagent.unit} ${index}`}
                        >
                          <ListItemIcon>
                            <ArrowRight />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${replaceWithUnicode(
                              reagent?.reagent ?? "N/A"
                            )} - ${reagent?.quantity ?? "N/A "}${
                              reagent?.unit ?? "N/A"
                            }`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
                {customReagents.length > 0 && (
                  <>
                    <Typography>
                      <TextEmphasis>Reactivos extra:</TextEmphasis>
                    </Typography>
                    <List disablePadding>
                      {customReagents.map((reagent, index) => (
                        <ListItem
                          disablePadding
                          key={`${reagent?.reagent} ${reagent?.quantity} ${reagent?.unit} ${index}`}
                        >
                          <ListItemIcon>
                            <ArrowRight />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${reagent?.reagent ?? "N/A"} - ${
                              reagent?.quantity ?? "N/A "
                            }${reagent?.unit ?? "N/A"}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
                {customEquipment.length > 0 && (
                  <>
                    <Typography>
                      <TextEmphasis>Equipo extra:</TextEmphasis>
                    </Typography>
                    <List disablePadding>
                      {customEquipment.map((equipment, index) => (
                        <ListItem
                          disablePadding
                          key={`Equipment ${equipment} ${index}`}
                        >
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
                      <TextEmphasis>Residuos extra:</TextEmphasis>
                    </Typography>
                    <List disablePadding>
                      {customWaste.map((waste, index) => (
                        <ListItem
                          disablePadding
                          key={`Waste ${waste?.residue} ${waste?.treatment} ${index}`}
                        >
                          <ListItemIcon>
                            <ArrowRight />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${waste?.residue ?? "N/A"} | ${
                              waste?.container ?? "N/A "
                            } | Tratamiento: ${waste?.treatment ?? "N/A"}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
                {comments?.length > 0 && (
                  <>
                    <Typography>
                      <TextEmphasis>Comentarios:</TextEmphasis>
                    </Typography>
                    <List disablePadding>
                      {comments.map((comment) => (
                        <ListItem disablePadding key={`Comment ${comment._id}`}>
                          <ListItemIcon>
                            <ArrowRight />
                          </ListItemIcon>
                          <ListItemText primary={comment.content} />
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
