import { useEffect, useState } from "react";

import {
  Box,
  Button,
  LinearProgress,
  MenuItem,
  Modal,
  TableCell,
  TableRow,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Send } from "@mui/icons-material";

import { RequestStep } from "./RequestStep";
import { GroupChip } from "./GroupChip";

import { Calendar } from "../Calendar/Calendar";
import { InfoLabel } from "../InfoLabel/InfoLabel";
import { Table } from "../Table/Table";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

import { useGroupsByPeriodData } from "../../hooks/useGroupsData";
import { useAssignmentsData } from "../../hooks/useAssignmentsData";
import { formatGroupName } from "../../utils";
import { CustomReagents } from "./CustomReagents";
import { TextEmphasis } from "../TextEmphasis";
import { EquipmentChip } from "./EquipmentChip";
import { EquipmentForm } from "./EquipmentForm";
import { CustomWaste } from "./CustomWaste";
import { postRequest } from "../../api/fetch";
import { useUser } from "@clerk/clerk-react";

const noAssignmentError = "Debes seleccionar una práctica.";

const getDateAfterDays = (days) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + days);
  return futureDate;
};

export const RequestForm = () => {
  const theme = useTheme();

  const { user } = useUser();

  const [currentStep, setCurrentStep] = useState(false);

  const [selectedGroup, setSelectedGroup] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [customReagents, setCustomReagents] = useState([]);
  const [customEquipment, setCustomEquipment] = useState([]);
  const [customWaste, setCustomWaste] = useState([]);

  const [groupErrors, setGroupErrors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: null,
    content: null,
  });

  const { groups, isLoading: groupsLoading } = useGroupsByPeriodData();
  const { assignments, isLoading: assignmentsLoading } = useAssignmentsData();

  useEffect(() => {
    if (groupErrors.length < 1) return;

    setModalContent((prev) => ({
      ...prev,
      content: (
        <div>
          {groupErrors.map((error) => (
            <ErrorMessage key={error}>{error}</ErrorMessage>
          ))}
        </div>
      ),
    }));
  }, [groupErrors]);

  const handleGroupChange = (index) => {
    setSelectedGroup(index);

    setSelectedAssignment("");
    setSelectedDate(null);
  };

  const handleAccordionChange = (step) => (event, expanded) => {
    setCurrentStep(expanded ? step : false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAssignmentChange = (e) => {
    setSelectedAssignment(
      assignments.find((assignment) => assignment._id === e.target.value)
    );
  };

  const clearForm = () => {
    setCurrentStep(false);

    setSelectedGroup(false);
    setSelectedAssignment("");
    setSelectedDate(new Date());

    setCustomReagents([]);
    setCustomEquipment([]);
    setCustomWaste([]);
  };

  const validateGroupStep = () => {
    setGroupErrors([]);
    let isValid = true;

    if (selectedGroup === false || selectedGroup < 0) {
      isValid = false;

      setGroupErrors((prev) => [
        ...prev,
        "Es obligatorio seleccionar un grupo.",
      ]);
    }

    if (selectedAssignment.length < 1) {
      isValid = false;
      setGroupErrors((prev) => [
        ...prev,
        "Es obligatorio seleccionar una práctica.",
      ]);
    }

    if (selectedDate === null) {
      isValid = false;
      setGroupErrors((prev) => [
        ...prev,
        "Es obligatorio seleccionar una fecha.",
      ]);
    }

    if (selectedGroup && selectedDate.getDay() !== groups[selectedGroup]?.day) {
      isValid = false;
      setGroupErrors((prev) => [
        ...prev,
        "La fecha seleccionada no coincide con el día de clase del grupo.",
      ]);
    }

    return isValid;
  };

  const handleSubmitCustomReagent = (reagent) => {
    setCustomReagents((prev) => [...prev, reagent]);
  };

  const handleDeleteCustomReagent = (reagent) => {
    setCustomReagents((prev) =>
      prev.filter((prevReagent) => prevReagent !== reagent)
    );
  };

  const handleSubmitCustomEquipment = (equipment) => {
    setCustomEquipment((prev) => [...prev, equipment]);
  };

  const handleDeleteCustomEquipment = (equipment) => {
    setCustomEquipment((prev) =>
      prev.filter((prevEquipment) => prevEquipment !== equipment)
    );
  };

  const handleSubmitCustomWaste = (waste) => {
    setCustomWaste((prev) => [...prev, waste]);
  };

  const handleDeleteCustomWaste = (waste) => {
    setCustomWaste((prev) => prev.filter((prevWaste) => prevWaste !== waste));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitRequest = async () => {
    if (!validateGroupStep()) {
      setModalContent((prev) => ({
        ...prev,
        title: (
          <Typography variant="h3" textAlign="center">
            Error en el formulario
          </Typography>
        ),
      }));
      setIsModalOpen(true);
      return;
    }

    const requestBody = {
      profId: user.id,
      groupId: groups[selectedGroup]._id,
      assignmentId: selectedAssignment._id,
      requestDate: new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      ).getTime(),
      customReagents,
      customEquipment,
      customWaste,
    };

    try {
      const requestResponse = await postRequest(requestBody);

      setModalContent({
        title: (
          <Typography variant="h3" textAlign="center">
            <TextEmphasis>Solicitud enviada</TextEmphasis>
          </Typography>
        ),
        content: (
          <>
            <Typography>{requestResponse.message}</Typography>
            <Typography>
              Puedes consultar el estado de la solicitud en la sección{" "}
              <TextEmphasis>Solicitudes creadas</TextEmphasis>.
            </Typography>
          </>
        ),
      });

      clearForm();
    } catch (error) {
      setModalContent({
        title: (
          <Typography variant="h3" textAlign="center">
            <TextEmphasis>Error en la solicitud</TextEmphasis>
          </Typography>
        ),
        content: (
          <>
            <Typography>
              {error.message || "Ha ocurrido un error inesperado."}
            </Typography>
            {error.error.message && (
              <Typography color="error">
                Detalles: {error.error.message}
              </Typography>
            )}
          </>
        ),
      });
    } finally {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <RequestStep
          stepLabel="Selecciona un grupo"
          expanded={currentStep === 0}
          onChange={handleAccordionChange(0)}
          error={groupErrors.length > 0}
        >
          {groupsLoading ? (
            <LinearProgress />
          ) : (
            <>
              {groups.length < 1 ? (
                <Typography>
                  No hay grupos disponibles. Dirígete a la sección de{" "}
                  <TextEmphasis>Mis grupos</TextEmphasis> para agregar tu primer
                  grupo.
                </Typography>
              ) : (
                <Tabs variant="scrollable" value={selectedGroup}>
                  {groups.map((group, index) => (
                    <GroupChip
                      clickable
                      key={group.__htmlid}
                      label={formatGroupName(index + 1, group.day, group.time)}
                      selected={index === selectedGroup}
                      onClick={handleGroupChange.bind(null, index)}
                    />
                  ))}
                </Tabs>
              )}
            </>
          )}

          <InfoLabel tooltip="Escoge la práctica que se llevará a cabo.">
            Práctica
          </InfoLabel>
          <TextField
            select
            fullWidth
            name="Práctica"
            disabled={assignmentsLoading}
            value={selectedAssignment._id || ""}
            onChange={handleAssignmentChange}
            label={assignmentsLoading ? "Cargando prácticas..." : "Práctica"}
            helperText={"Selecciona una de las prácticas."}
          >
            {assignments.map((assignment) => (
              <MenuItem key={assignment._id} value={assignment._id}>
                {`Práctica ${assignment.number}: ${assignment.name}`}
              </MenuItem>
            ))}
          </TextField>

          <InfoLabel tooltip="Escoge la fecha en la que se llevará a cabo esta práctica. Solo se muestran fechas disponibles para el grupo seleccionado. La solicitud debe hacerse al menos 7 días antes de la fecha de realización de la práctica.">
            Escoge una fecha
          </InfoLabel>
          <Calendar
            disablePast
            shouldDisableDate={(date) =>
              date.getDay() !== groups[selectedGroup]?.day ||
              date < getDateAfterDays(7)
            }
            value={selectedDate}
            groupDay={groups[selectedGroup]?.day}
            disabled={!groups}
            onChange={handleDateChange}
          />

          <Button
            variant="contained"
            size="large"
            sx={{ mx: { sm: "auto" } }}
            onClick={() => setCurrentStep((prev) => prev + 1)}
          >
            Confirmar
          </Button>
        </RequestStep>
        <RequestStep
          stepLabel="Reactivos"
          expanded={currentStep === 1}
          onChange={handleAccordionChange(1)}
        >
          {!selectedAssignment ? (
            <ErrorMessage>{noAssignmentError}</ErrorMessage>
          ) : (
            <>
              <InfoLabel tooltip="Estos son los reactivos predefinidos para la práctica seleccionada. Puedes agregar más si es necesario.">
                Reactivos de esta práctica
              </InfoLabel>
              {selectedAssignment.reagents.groups.length < 1 && (
                <Table
                  tableHead={
                    <TableRow>
                      <TableCell>Reactivo</TableCell>
                      <TableCell align="right">Cantidad</TableCell>
                      <TableCell align="right">Unidad</TableCell>
                    </TableRow>
                  }
                >
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography textAlign="center">
                        Esta práctica no contiene{" "}
                        <TextEmphasis>reactivos</TextEmphasis>
                      </Typography>
                    </TableCell>
                  </TableRow>
                </Table>
              )}
              {selectedAssignment.reagents.groups.map((group, index) => (
                <Table
                  key={`Reagents table ${index}`}
                  tableHead={
                    <TableRow>
                      <TableCell>Reactivo</TableCell>
                      <TableCell align="right">Cantidad</TableCell>
                      <TableCell align="right">Unidad</TableCell>
                    </TableRow>
                  }
                >
                  {group.reagents.map((reagent) => (
                    <TableRow key={reagent.reagent}>
                      <TableCell
                        dangerouslySetInnerHTML={{ __html: reagent.reagent }}
                      />
                      <TableCell align="right">
                        {reagent.quantity || "--"}
                      </TableCell>
                      <TableCell align="right">
                        {reagent.unit || "--"}
                      </TableCell>
                    </TableRow>
                  ))}
                </Table>
              ))}
              <CustomReagents
                onAddReagent={handleSubmitCustomReagent}
                onDeleteReagent={handleDeleteCustomReagent}
                reagents={customReagents}
              />
              <Button
                variant="contained"
                size="large"
                sx={{ mx: { sm: "auto" } }}
                onClick={() => setCurrentStep((prev) => prev + 1)}
              >
                Confirmar
              </Button>
            </>
          )}
        </RequestStep>
        <RequestStep
          stepLabel="Equipo de laboratorio"
          expanded={currentStep === 2}
          onChange={handleAccordionChange(2)}
        >
          {!selectedAssignment ? (
            <ErrorMessage>{noAssignmentError}</ErrorMessage>
          ) : (
            <>
              <InfoLabel tooltip="Este es el equipamiento definido para la práctica seleccionada. Puedes agregar más si es necesario.">
                Equipo de laboratorio
              </InfoLabel>

              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
              >
                <Box
                  sx={{
                    backgroundColor: theme.palette.grey.main,
                    height: "fit-content",
                    width: "100%",
                    border: "1px solid #ccc",
                    borderRadius: "0.5rem",
                    p: "0.5rem",
                  }}
                >
                  {selectedAssignment.equipment.length < 1 &&
                    customEquipment.length < 1 && (
                      <Typography textAlign="center">
                        Esta práctica no requiere{" "}
                        <TextEmphasis>equipamiento</TextEmphasis>
                      </Typography>
                    )}
                  {selectedAssignment.equipment.map((equipment) => (
                    <EquipmentChip key={equipment} label={equipment} />
                  ))}
                  {customEquipment.map((equipment) => (
                    <EquipmentChip
                      custom
                      key={equipment}
                      label={equipment}
                      onDelete={handleDeleteCustomEquipment.bind(
                        null,
                        equipment
                      )}
                    />
                  ))}
                </Box>
                <EquipmentForm onSubmit={handleSubmitCustomEquipment} />
              </Box>

              <Button
                variant="contained"
                size="large"
                sx={{ mx: { sm: "auto" } }}
                onClick={() => setCurrentStep((prev) => prev + 1)}
              >
                Confirmar
              </Button>
            </>
          )}
        </RequestStep>
        <RequestStep
          stepLabel="Residuos"
          expanded={currentStep === 3}
          onChange={handleAccordionChange(3)}
        >
          {!selectedAssignment ? (
            <ErrorMessage>{noAssignmentError}</ErrorMessage>
          ) : (
            <>
              <InfoLabel tooltip="Estos son los residuos predefinidos para la práctica seleccionada. Puedes agregar más si es necesario.">
                Residuos
              </InfoLabel>
              <Table
                tableHead={
                  <TableRow>
                    <TableCell>Residuo</TableCell>
                    <TableCell align="right">Envase</TableCell>
                    <TableCell align="right">Tratamiento</TableCell>
                  </TableRow>
                }
              >
                {selectedAssignment.waste.length < 1 ? (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography textAlign="center">
                        Esta práctica no contiene{" "}
                        <TextEmphasis>residuos</TextEmphasis>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  selectedAssignment.waste.map((waste) => (
                    <TableRow key={waste.residue}>
                      <TableCell
                        dangerouslySetInnerHTML={{ __html: waste.residue }}
                      />
                      <TableCell align="right">
                        {waste.container || "--"}
                      </TableCell>
                      <TableCell align="right">
                        {waste.treatment || "--"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </Table>
              <CustomWaste
                waste={customWaste}
                onAddWaste={handleSubmitCustomWaste}
                onDeleteWaste={handleDeleteCustomWaste}
              />
              <Button
                variant="contained"
                size="large"
                sx={{ mx: { sm: "auto" } }}
                onClick={() => setCurrentStep(false)}
              >
                Confirmar
              </Button>
            </>
          )}
        </RequestStep>
        <Button
          variant="contained"
          size="large"
          sx={{ mx: { sm: "auto" } }}
          startIcon={<Send />}
          onClick={handleSubmitRequest}
        >
          Enviar solicitud
        </Button>
      </Box>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "whitesmoke",
            borderRadius: "0.5rem",
            p: "1rem",
            width: { xs: "90%", sm: "50%" },
          }}
        >
          {modalContent.title}
          {modalContent.content}
          <Button
            variant="contained"
            size="large"
            sx={{ mx: { sm: "auto" } }}
            onClick={handleCloseModal}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </>
  );
};
