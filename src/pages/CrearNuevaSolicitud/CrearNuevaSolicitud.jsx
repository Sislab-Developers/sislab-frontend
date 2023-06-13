import { CustomButton } from "../../components";
import { useState, useCallback, useEffect, useContext } from "react";

import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  MenuItem,
  Typography,
  Chip,
  Tabs,
  useTheme,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material";

import AuthContext from "../../context/AuthContext";
import { getToken } from "../../utils/authServices";

import { getGrupos } from "../../api/fetch";
import { Calendar } from "../../components/Calendar/Calendar";

import { ExpandMore } from "@mui/icons-material";

import { TextEmphasis } from "../../components/TextEmphasis";

import classes from "./MakeRequest.module.css";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const practicas = [
  {
    label: "Práctica 1 | Material y equipo básico de laboratorio",
  },
  {
    label: "Práctica 2 | Método científico",
  },
  {
    label: "Práctica 3 | Separación de una mezcla mediante cambios físicos",
  },
  {
    label: "Práctica 4 | Identificación de metales por ensaye a la flama",
  },
  {
    label: "Práctica 5 | Compuestos iónicos y covalentes",
  },
  {
    label: "Práctica 6 | Enlace Metálico",
  },
  {
    label: "Práctica 7 | Estudio sobre los diferentes tipos de reacciones",
  },
  {
    label: "Práctica 8 | Undefined",
  },
  {
    label: "Práctica 9 | Undefined",
  },
  {
    label: "Práctica 10 | Reacciones de oxidación-reducción",
  },
  {
    label: "Práctica 11 | Ley de las proporciones definidas",
  },
  {
    label: "Práctica 12 | Ley de la conservación de la materia",
  },
  {
    label: "Práctica 13 | Agua de hidratación",
  },
  {
    label: "Práctica 14 | Determinación de pesos atómicos",
  },
  {
    label: "Práctica 15 | Estequiometría",
  },
  {
    label: "Práctica 16 | Estequiometría en la sintesis de NaCI",
  },
  {
    label: "Práctica 17 | Reactivo limitante",
  },
  {
    label: "Práctica 18 | Concentración de soluciones",
  },
  {
    label: "Práctica 19 | Valoración de soluciones I",
  },
  {
    label: "Práctica 20 | Valoración de soluciones II",
  },
  {
    label: "Práctica 21 | Peso equivalente del acido fosfórico",
  },
  {
    label: "Práctica 22 | Peso equivalente de un metal",
  },
  {
    label: "Práctica personalizada",
  },
];

export const CrearNuevaSolicitud = () => {
  const [grupos, setGrupos] = useState();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const chipDelete = () => {};

  const theme = useTheme();

  const authCtx = useContext(AuthContext);

  const uid = getToken(authCtx.token, true).uid;

  const fetchData = useCallback(async (uid) => {
    try {
      const [gruposResponse] = await Promise.all([getGrupos(uid)]);
      setGrupos(gruposResponse?.grupos);

      if (gruposResponse?.grupos === 0 || gruposResponse?.grupos === null) {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData(uid);
  }, [fetchData, uid]);

  return (
    <Box className={classes["new-request"]}>
      <Typography variant="h1">
        Crear <TextEmphasis>nueva solicitud</TextEmphasis>
      </Typography>
      <Typography variant="body1">
        Para crear una <TextEmphasis>nueva solicitud</TextEmphasis> llena los
        siguientes campos
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            backgroundColor: "#f2f5f2",
          }}
        >
          <Typography variant="body1">Primer paso</Typography>
        </AccordionSummary>
        <div className="centerComboBox">
          <AccordionDetails>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": {
                  minWidth: "fit-content",
                  maxWidth: "32ch",
                  alignSelf: "center",
                },
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                marginTop: "20px",
              }}
              noValidate
              autoComplete="off"
              menuprops={{
                disableScrollLock: true,
              }}
            >
              {loading ? (
                <Tabs
                  disabled
                  variant="scrollable"
                  scrollButtons="auto"
                  value={index}
                  TabIndicatorProps={{ style: { display: "none" } }}
                >
                  {grupos?.map((chip, ind) => (
                    <Chip
                      sx={{
                        width: "fill-content",
                        height: "fill-content",
                        marginX: "10px",
                      }}
                      label={chip?.nombre || ""}
                      clickable
                      onClick={() => (setSelected(chip), setIndex(ind))}
                      color={selected === chip ? "primary" : "default"}
                    />
                  ))}
                </Tabs>
              ) : (
                <div>No tiene grupos, cree uno para continuar</div>
              )}

              <h1>
                Práctica<i className="ri-information-line"></i>
              </h1>

              <TextField
                id="outlined-select-currency"
                select
                label="Practica"
                helperText="Selecciona una de las prácticas"
                defaultValue=""
                sx={{ maxWidth: "fit-content" }}
              >
                {practicas.map((option) => (
                  <MenuItem key={option.label} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <h1>
                Escoge una fecha<i className="ri-information-line"></i>
              </h1>
              <Calendar dayName={selected ? selected.dia : null} />
              <div id="boton-confirmar">
                <CustomButton text="Confirmar"></CustomButton>
              </div>
            </Box>
          </AccordionDetails>
        </div>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            backgroundColor: "#f2f5f2",
          }}
        >
          <Typography>Reactivos</Typography>
        </AccordionSummary>
        <div className="centerComboBox">
          <AccordionDetails>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Reactivos</TableCell>
                    <TableCell align="center">Cantidad</TableCell>
                    <TableCell align="center">Medida</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.carbs}</TableCell>
                      <TableCell align="center">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br></br>
            <div id="boton-confirmar">
              <CustomButton text="Confirmar"></CustomButton>
            </div>
          </AccordionDetails>
        </div>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            backgroundColor: "#f2f5f2",
          }}
        >
          <Typography>Equipo</Typography>
        </AccordionSummary>
        <div className="centerComboBox">
          <AccordionDetails>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gridGap: "10px",
                marginBottom: "20px",
              }}
            >
              <Chip
                sx={{
                  height: "auto",
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                  },
                }}
                label="This is a chip that has multiple lines."
                color="primary"
                onDelete={chipDelete}
              />

              <Chip
                sx={{
                  height: "auto",
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                  },
                }}
                label="This is a chip that has multiple lines."
                color="primary"
                onDelete={chipDelete}
              />

              <Chip
                sx={{
                  height: "auto",
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                  },
                }}
                label="This is a chip that has multiple lines."
                color="primary"
                onDelete={chipDelete}
              />

              <Chip
                sx={{
                  height: "auto",
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                  },
                }}
                label="This is a chip that has multiple lines."
                color="primary"
                onDelete={chipDelete}
              />

              <Chip
                sx={{
                  height: "auto",
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                  },
                }}
                label="This is a chip that has multiple lines."
                color="primary"
                onDelete={chipDelete}
              />

              <Chip
                sx={{
                  height: "auto",
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                  },
                }}
                label="simon we "
                color="primary"
                onDelete={chipDelete}
              />

              <Chip
                sx={{
                  height: "auto",
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                  },
                }}
                label="This is a chip that has multiple lines."
                color="primary"
                onDelete={chipDelete}
              />
            </Box>

            <div id="boton-confirmar">
              <CustomButton text="Confirmar"></CustomButton>
            </div>
          </AccordionDetails>
        </div>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            backgroundColor: "#f2f5f2",
          }}
        >
          <Typography>Residuos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Reactivos</TableCell>
                  <TableCell align="center">Cantidad</TableCell>
                  <TableCell align="center">Medida</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.carbs}</TableCell>
                    <TableCell align="center">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <div id="boton-confirmar">
            <CustomButton text="Confirmar"></CustomButton>
          </div>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
