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
  useTheme,
} from "@mui/material";
import { ArrowRight, CheckCircle, ExpandMore } from "@mui/icons-material";

import { GroupChip } from "../NewRequest/GroupChip";
import {
  formatAssignment,
  formatGroupName,
  formatProfName,
  formatTimeslot,
  fullDateFormat,
  fullDateTimeFormat,
} from "../../utils";
import { useState } from "react";
import { TextEmphasis } from "../TextEmphasis";

export const RequestItem = ({ request, index }) => {
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

  const theme = useTheme();

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Card
      component="li"
      sx={{
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxShadow: "1px 1px 4px 0 rgba(0, 0, 0, 0.24)",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        position: "relative",
      }}
    >
      <CardActionArea onClick={toggleExpanded} sx={{ padding: "1rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: "0.5rem",
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            mb: "0.5rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "0.25rem",
              alignItems: "center",
            }}
          >
            <CheckCircle color="primary" />
            <Typography variant="h3" color="primary" fontWeight="bold">
              Solicitud creada
            </Typography>
          </Box>
          <Box sx={{ mr: { sm: "2rem" }, mx: { xs: "auto" } }}>
            <GroupChip
              label={formatGroupName(index + 1, group?.day, group?.time)}
              selected
            />
          </Box>
          <ExpandMore
            color={isExpanded ? "default" : "primary"}
            sx={{
              position: "absolute",
              right: "1rem",
              transition: "transform 200ms linear, color 400ms linear",
              transform: `rotate(${isExpanded ? "180" : "0"}deg)`,
            }}
          />
        </Box>
        <Box
          sx={{
            borderRadius: "8px",
            backgroundColor: theme.palette.primary.translucid,
            display: "flex",
            flexDirection: "column",
            padding: "0.5rem",
            width: "100%",
            border: `1px solid ${theme.palette.primary.main}`,
          }}
        >
          <Typography color="primary" fontWeight="bold">
            {formatAssignment(assignment)}.
          </Typography>
          <Typography>
            <TextEmphasis>Laboratorio:</TextEmphasis> {group.lab}.
          </Typography>
          <Typography>
            <TextEmphasis>Fecha:</TextEmphasis> {fullDateFormat(requestDate)}.
          </Typography>
          <Collapse in={isExpanded} unmountOnExit>
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
              {customReagents.length > 0 && (
                <>
                  <Typography>
                    <TextEmphasis>Reactivos extra:</TextEmphasis>
                  </Typography>
                  <List disablePadding>
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
                  <List disablePadding>
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
                  <List disablePadding>
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
          </Collapse>
        </Box>
      </CardActionArea>
    </Card>
  );
};
