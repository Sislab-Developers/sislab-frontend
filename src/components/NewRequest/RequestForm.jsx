import { useState } from "react";

import {
  Box,
  Button,
  LinearProgress,
  MenuItem,
  TableCell,
  TableRow,
  Tabs,
  TextField,
} from "@mui/material";

import { RequestStep } from "./RequestStep";
import { GroupChip } from "./GroupChip";

import { Calendar } from "../Calendar/Calendar";
import { InfoLabel } from "../InfoLabel/InfoLabel";
import { Table } from "../Table/Table";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

import { useGroupsData } from "../../hooks/useGroupsData";
import { useAssignmentsData } from "../../hooks/useAssignmentsData";

const createData = (name, calories, unit) => {
  return { name, calories, unit };
};

const rows = [
  createData("Frozen yoghurt", 159, "cal"),
  createData("Ice cream sandwich", 237, "cal"),
  createData("Eclair", 262, "cal"),
  createData("Cupcake", 305, "cal"),
  createData("Gingerbread", 356, "cal"),
];

export const RequestForm = () => {
  const [currentStep, setCurrentStep] = useState(-1);

  const [selectedGroup, setSelectedGroup] = useState(0);
  const [groupError, setGroupError] = useState(null);

  const [selectedAssignment, setSelectedAssignment] = useState("");
  const [assignmentError, setAssignmentError] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [dateError, setDateError] = useState(null);

  const {
    groups,
    total,
    isLoading: groupsLoading,
    fetchGroups,
  } = useGroupsData();
  const {
    assignments,
    isLoading: assignmentsLoading,
    fetchAssignments,
  } = useAssignmentsData();

  const handleDateChange = (date) => {
    setDateError(null);
    setSelectedDate(date);
  };

  const handleAssignmentChange = (e) => {
    setAssignmentError(null);
    setSelectedAssignment(e.target.value);
  };

  const validateGroupStep = () => {
    let isValid = true;

    if (isNaN(selectedGroup)) {
      isValid = false;

      setGroupError("Hay un error con el grupo seleccionado.");
    }

    if (selectedAssignment.length < 1) {
      isValid = false;
      setAssignmentError("Hay un error en el campo de práctica.");
    }

    if (selectedDate === null) {
      isValid = false;
      setDateError("Hay un error con la fecha seleccionada.");
    }

    if (!isValid) return;

    setCurrentStep((prev) => prev + 1);
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
    >
      <RequestStep
        stepLabel="Selecciona un grupo"
        expanded={currentStep === 0}
        onChange={() => setCurrentStep(0)}
      >
        {groupsLoading ? (
          <LinearProgress />
        ) : (
          <>
            <Tabs variant="scrollable" value={selectedGroup}>
              {groups &&
                groups.map((group, index) => (
                  <GroupChip
                    key={group.uid}
                    label={group.nombre}
                    selected={index === selectedGroup}
                    onClick={() => {
                      setGroupError(null);
                      setSelectedGroup(index);
                    }}
                  />
                ))}
            </Tabs>
            {groupError && <ErrorMessage>{groupError}</ErrorMessage>}
          </>
        )}

        <>
          <InfoLabel tooltip="Escoge la práctica que se llevará a cabo.">
            Práctica
          </InfoLabel>
          <TextField
            select
            fullWidth
            name="Práctica"
            disabled={assignmentsLoading}
            value={selectedAssignment}
            onChange={handleAssignmentChange}
            label={assignmentsLoading ? "Cargando prácticas..." : "Práctica"}
            helperText={
              assignmentError
                ? assignmentError
                : "Selecciona una de las prácticas."
            }
            error={!!assignmentError}
          >
            {assignments.map((assignment) => (
              <MenuItem key={assignment._id} value={assignment}>
                {`Práctica ${assignment.number}: ${assignment.name}`}
              </MenuItem>
            ))}
          </TextField>
        </>

        <>
          <InfoLabel tooltip="Escoge la fecha en la que se llevará a cabo esta práctica. Solo se muestran fechas disponibles para el grupo seleccionado.">
            Escoge una fecha
          </InfoLabel>
          <Calendar
            value={selectedDate}
            groupDay={groups[selectedGroup]?.dia}
            disabled={!groups}
            onChange={handleDateChange}
          />
          {dateError && <ErrorMessage>{dateError}</ErrorMessage>}
        </>

        <Button
          variant="contained"
          size="large"
          sx={{ mx: { sm: "auto" } }}
          onClick={validateGroupStep}
        >
          Confirmar
        </Button>
      </RequestStep>
      <RequestStep
        stepLabel="Reactivos"
        expanded={currentStep === 1}
        onChange={() => setCurrentStep(1)}
      >
        <InfoLabel tooltip="Estos son los reactivos predefinidos para la práctica seleccionada. Puedes agregar más si es necesario.">
          Reactivos de esta práctica
        </InfoLabel>
        {selectedAssignment &&
          selectedAssignment.reagents.groups.map((group, index) => (
            <Table
              key={`Reagents table ${index}`}
              headTitles={["Reactivo", "Cantidad", "Medida"]}
            >
              {group.reagents.map((reagent) => (
                <TableRow key={reagent.reagent}>
                  <TableCell
                    dangerouslySetInnerHTML={{ __html: reagent.reagent }}
                  ></TableCell>
                  <TableCell align="right">
                    {reagent.quantity || "--"}
                  </TableCell>
                  <TableCell align="right">{reagent.unit || "--"}</TableCell>
                </TableRow>
              ))}
            </Table>
          ))}
      </RequestStep>
      <RequestStep
        stepLabel="Equipo"
        expanded={currentStep === 2}
        onChange={() => setCurrentStep(2)}
      ></RequestStep>
      <RequestStep
        stepLabel="Residuos"
        expanded={currentStep === 3}
        onChange={() => setCurrentStep(3)}
      ></RequestStep>
    </Box>
  );
};
