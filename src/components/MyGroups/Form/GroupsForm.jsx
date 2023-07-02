import { useState, useCallback, useEffect, useContext } from "react";

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
import AuthContext from "../../../context/AuthContext.jsx";
import SnackbarContext from "../../../context/SnackBar/SnackBarContext";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../Modal/Modal";
import CustomSnackbar from "../../CustomSnackBar";

import { getLaboratorios, getCarreras, getMaterias } from "../../../api/fetch";

const weekDays = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

const dayTimes = Array.from(Array(13).keys()).map(
  (i) => `${i + 7}:00 - ${i + 9}:00`
);

export const GroupsForm = ({ total = 0, onAddGroup }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({});
  const [labs, setLabs] = useState([]);
  const [careers, setCareers] = useState([]);
  const [signatures, setSignatures] = useState([]);
  const [loading, setLoading] = useState(false);

  const { setOpen, setMessage, setSeverity } = useContext(SnackbarContext);

  const { isShowing, toggle } = useModal();

  const authCtx = useContext(AuthContext);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [laboratoriosResponse, carrerasResponse, materiasResponse] =
        await Promise.all([getLaboratorios(), getCarreras(), getMaterias()]);
      setLabs(laboratoriosResponse?.laboratorios);
      setCareers(carrerasResponse?.carreras);
      setSignatures(materiasResponse?.materias);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleExpanded = () => {
    setIsExpanded((isExpanded) => !isExpanded);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    instance
      .post(
        `grupos`,
        {
          nombre: `G${total + 1} | ${formData.dia} | ${formData.hora}`,
          laboratorio: formData.laboratorio,
          materia: formData.materia,
          carrera: formData.carrera,
          alumnos: formData.alumnos,
          equipos: formData.equipos,
          dia: formData.dia,
          hora: formData.hora,
          usuario: authCtx.user.uid,
        },
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        toggle();
        setLoading(true);
        setIsExpanded(false);
        setFormData({});
      })
      .catch((error) => {
        console.log(error);
        setOpen(true);
        setSeverity("error");
        setMessage(error.msg ? error.msg : error.errors[0].msg);
      })
      .finally(() => {
        setLoading(false);
        onAddGroup();
      });
  };

  const handleChange = (e) => {
    const currentData = { ...formData };
    currentData[e.target.name] = e.target.value;
    setFormData(currentData);
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
              {`G${total + 1} | ${formData.dia || "..."} | ${
                formData.hora || "..."
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
            <Typography variant="h3">
              Laboratorio<i className="ri-information-line"></i>
            </Typography>
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
              {labs.length !== 0 ? (
                labs.map((lab) => (
                  <MenuItem key={lab.uid} value={lab.laboratorio}>
                    {lab.laboratorio}
                  </MenuItem>
                ))
              ) : (
                <div />
              )}
            </TextField>

            <Typography variant="h3">
              Carrera<i className="ri-information-line"></i>
            </Typography>
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
              {careers.length !== 0 ? (
                careers.map((career) => (
                  <MenuItem
                    key={career.uid}
                    value={career.carrera}
                    disablescrolllock="true"
                  >
                    {career.carrera}
                  </MenuItem>
                ))
              ) : (
                <div />
              )}
            </TextField>

            <Typography variant="h3">
              Materia
              <i className="ri-information-line" />
            </Typography>
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
              {signatures.length !== 0 ? (
                signatures.map((signature) => (
                  <MenuItem key={signature.uid} value={signature.materia}>
                    {signature.materia}
                  </MenuItem>
                ))
              ) : (
                <div />
              )}
            </TextField>

            <Typography variant="h3">
              Número de alumnos
              <i className="ri-information-line" />
            </Typography>
            <TextField
              name="alumnos"
              required
              type="number"
              label="Número de alumnos"
              disabled={loading}
              value={formData.alumnos || ""}
              onChange={handleChange}
              helperText="Escribe el número de alumnos"
            />

            <Typography variant="h3">
              Número de equipos
              <i className="ri-information-line" />
            </Typography>
            <TextField
              required
              name="equipos"
              type="number"
              label="Número de equipos"
              disabled={loading}
              value={formData.equipos || ""}
              onChange={handleChange}
              helperText="Escribe el número de equipos"
            />

            <Typography variant="h3">
              Día de la semana
              <i className="ri-information-line" />
            </Typography>
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
              {!loading ? (
                weekDays.map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))
              ) : (
                <div />
              )}
            </TextField>

            <Typography variant="h3">
              Hora de clase<i className="ri-information-line"></i>
            </Typography>
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
              {!loading ? (
                dayTimes.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))
              ) : (
                <div />
              )}
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
