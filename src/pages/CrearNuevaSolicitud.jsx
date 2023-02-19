import { MaestroHeader, CustomButton } from "../components";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
  const content = (
    <>
      <MaestroHeader colorNuevaSolicitud="nueva-solicitud-color" />
      <div className="content">
        <div className="title">
          <h1>Crear nueva solicitud</h1>
        </div>
        <div className="subtitle">
          <h1>
            Para crear una{" "}
            <span className="color_en_texto">nueva solicitud</span> llena los
            siguientes campos
          </h1>
        </div>

        <div className="contentWrapper">
          <div className="accordion">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Primer paso</Typography>
              </AccordionSummary>
              <div className="centerComboBox">
                <AccordionDetails>
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { width: "32ch" },
                    }}
                    noValidate
                    autoComplete="off"
                    menuprops={{
                      disableScrollLock: true,
                    }}
                  >
                    <h1>
                      Práctica<i className="ri-information-line"></i>
                    </h1>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Practica"
                      helperText="Selecciona una de las prácticas"
                      defaultValue=""
                    >
                      {practicas.map((option) => (
                        <MenuItem key={option.label} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <br></br>
                    <br></br>
                    <div id="boton-confirmar">
                      <CustomButton text="Confirmar"></CustomButton>
                    </div>
                    <br></br>
                    <br></br>
                  </Box>
                </AccordionDetails>
              </div>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Reactivos</Typography>
              </AccordionSummary>
              <div className="centerComboBox">
                <AccordionDetails>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Reactivos</TableCell>
                          <TableCell align="right">Cantidad</TableCell>
                          <TableCell align="right">Medida</TableCell>
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
                  <br></br>
                  <div id="boton-confirmar">
                    <CustomButton text="Confirmar"></CustomButton>
                  </div>
                </AccordionDetails>
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );

  return content;
};
