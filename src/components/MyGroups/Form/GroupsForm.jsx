/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";

import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import check from "../../../assets/img/check.svg";

import instance from "../../../utils/axiosConfig";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../Modal/Modal";
import CustomSnackbar from "../../CustomSnackBar";

import { getLaboratorios, getCarreras, getMaterias } from "../../../api/fetch";
import { currentSemester, dayMap, days, formatTimeslot } from "../../../utils";
import { InfoLabel } from "../../InfoLabel/InfoLabel";
import ModalContext from "../../../context/Modal/ModalContext";
import { useUser } from "@clerk/clerk-react";

const dayTimes = Array.from(Array(13).keys()).map(
  (i) => `${i + 7}:00 - ${i + 9}:00`
);

export const GroupsForm = ({ total = 0, onAddGroup }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    laboratorio: "",
    carrera: "",
    materia: "",
    dia: "",
    hora: "",
    alumnos: "",
    equipos: "",
  });
  const [labs, setLabs] = useState([]);
  const [careers, setCareers] = useState([]);
  const [signatures, setSignatures] = useState([]);
  const [loading, setLoading] = useState(false);

  const { updateContent } = useContext(ModalContext);

  const { isShowing, toggle } = useModal();

  const { user } = useUser();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [laboratoriosResponse, carrerasResponse, materiasResponse] =
        await Promise.all([getLaboratorios(), getCarreras(), getMaterias()]);
      setLabs(laboratoriosResponse?.laboratorios);
      setCareers(carrerasResponse?.carreras);
      setSignatures(materiasResponse?.materias);
    } catch (error) {
      updateContent({
        title: "Error",
        content: `Ocurrió un error al obtener los datos del formulario. Detalles: ${
          error.msg ? error.msg : error.errors[0].msg
        }`,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExpanded = () => {
    setIsExpanded((isExpanded) => !isExpanded);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    instance
      .post(`grupos`, {
        lab: formData.laboratorio,
        career: formData.carrera,
        signature: formData.materia,
        students: formData.alumnos,
        teams: formData.equipos,
        day: dayMap[formData.dia],
        time: formData.hora,
        prof: user.id,
        period: currentSemester,
      })
      .then((response) => {
        updateContent({
          title: "Grupo creado",
          content: response.message,
        });
        setIsExpanded(false);
        setFormData({});
        onAddGroup();
      })
      .catch((error) => {
        console.log(error);
        updateContent({
          title: "Error",
          content: `Ocurrió un error al crear el grupo. Detalles: ${error.message}`,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setFormData((prev) => {
      const newData = { ...prev };
      newData[e.target.name] = e.target.value;
      return newData;
    });
  };

  return (
    <>
      <Accordion
        sx={{
          mx: "auto",
          width: "100%",
        }}
        expanded={isExpanded}
        onChange={loading ? null : handleExpanded}
      >
        <AccordionSummary sx={{ backgroundColor: theme.palette.primary.main }}>
          {loading ? (
            <CircularProgress sx={{ mx: "auto", color: "white" }} />
          ) : !isExpanded ? (
            <Add sx={{ mx: "auto", color: "white" }} />
          ) : (
            <Typography variant="body1" sx={{ color: "white" }}>
              {`G${total + 1} | ${formData.dia?.toUpperCase() || "..."} | ${
                formatTimeslot(formData.hora) || "..."
              }`}
            </Typography>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <InfoLabel tooltip="Escoge el laboratorio asignado al grupo.">
              Laboratorio
            </InfoLabel>
            <TextField
              select
              name="laboratorio"
              required
              label="Laboratorio"
              disabled={loading}
              value={formData.laboratorio || ""}
              onChange={handleChange}
              helperText="Escribe el laboratorio"
            >
              {labs.map((lab) => (
                <MenuItem key={lab.uid} value={lab.laboratorio}>
                  {lab.laboratorio}
                </MenuItem>
              ))}
            </TextField>

            <InfoLabel tooltip="La carrera a la que pertenece el grupo.">
              Carrera
            </InfoLabel>
            <TextField
              name="carrera"
              required
              select
              label="Carrera"
              disabled={loading}
              value={formData.carrera || ""}
              onChange={handleChange}
              helperText="Selecciona la carrera de este grupo"
            >
              {careers.map((career) => (
                <MenuItem
                  key={career.uid}
                  value={career.carrera}
                  disablescrolllock="true"
                >
                  {career.carrera}
                </MenuItem>
              ))}
            </TextField>

            <InfoLabel tooltip="La materia asignada al grupo.">
              Materia
            </InfoLabel>
            <TextField
              required
              name="materia"
              select
              label="Materia"
              disabled={loading}
              value={formData.materia || ""}
              onChange={handleChange}
              helperText="Selecciona la materia de este grupo"
            >
              {signatures.map((signature) => (
                <MenuItem key={signature.uid} value={signature.materia}>
                  {signature.materia}
                </MenuItem>
              ))}
            </TextField>

            <InfoLabel tooltip="El número de alumnos que tiene el grupo.">
              Número de alumnos
            </InfoLabel>
            <TextField
              name="alumnos"
              required
              type="number"
              onWheel={(e) => e.target.blur()}
              label="Número de alumnos"
              disabled={loading}
              value={formData.alumnos || ""}
              onChange={handleChange}
              helperText="Escribe el número de alumnos"
            />

            <InfoLabel tooltip="El número de equipos que tendrá el grupo.">
              Número de equipos
            </InfoLabel>
            <TextField
              required
              name="equipos"
              type="number"
              onWheel={(e) => e.target.blur()}
              label="Número de equipos"
              disabled={loading}
              value={formData.equipos || ""}
              onChange={handleChange}
              helperText="Escribe el número de equipos"
            />

            <InfoLabel tooltip="El día de la semana que se da la clase.">
              Día de la semana
            </InfoLabel>
            <TextField
              required
              name="dia"
              select
              label="Día de la semana"
              disabled={loading}
              value={formData.dia || ""}
              onChange={handleChange}
              helperText="Selecciona el día de la semana"
            >
              {days.map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </TextField>

            <InfoLabel tooltip="La hora a la que se da la clase.">
              Hora de clase
            </InfoLabel>
            <TextField
              required
              name="hora"
              select
              label="Hora de clase"
              disabled={loading}
              value={formData.hora || ""}
              onChange={handleChange}
              helperText="Selecciona la hora de clase de este grupo"
            >
              {dayTimes.map((time, index) => (
                <MenuItem key={time} value={index + 7}>
                  {time}
                </MenuItem>
              ))}
            </TextField>
            <Button
              sx={{ mx: "auto" }}
              variant="contained"
              size="large"
              id="Btn_login"
              type="submit"
              disabled={loading}
            >
              Confirmar
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Modal isShowing={isShowing} toggle={toggle}>
        <Typography
          component={"span"}
          variant={"body2"}
          align="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap="5px"
        >
          <img src={check} alt="Check icon" height="75" width="120" />
          <DialogTitle>{"Nuevo grupo creado con éxito"}</DialogTitle>
          <Button
            style={{
              borderRadius: 13,
              backgroundColor: "#00C795",
              padding: "10px 32px",
              fontSize: "16px",
              textTransform: "none",
              fontWeight: "regular",
              width: 140,
              height: 45,
            }}
            variant="contained"
            size="large"
            onClick={toggle}
          >
            Cerrar
          </Button>
        </Typography>
      </Modal>

      <CustomSnackbar />
    </>
  );
};
