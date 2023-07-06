import {
  Typography,
  TextField,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Button,
} from "@mui/material";

import { StyledAccordion } from "../../components/UI/StyledAccordion";
import { TextEmphasis } from "../../components/TextEmphasis";

import classes from "./MakeRequest.module.css";
import { useGroupsData } from "../../hooks/useGroupsData";
import { RequestForm } from "../../components/NewRequest/RequestForm";

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
    label: "Práctica 8",
  },
  {
    label: "Práctica 9",
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
    label: "Práctica 16 | Estequiometría en la síntesis de NaCl",
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
    label: "Práctica 21 | Peso equivalente del ácido fosfórico",
  },
  {
    label: "Práctica 22 | Peso equivalente de un metal",
  },
];

export const CrearNuevaSolicitud = () => {
  const { groups, total, isLoading, fetchGroups } = useGroupsData();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Typography variant="h1">
        Crear <TextEmphasis>nueva solicitud</TextEmphasis>
      </Typography>
      <Typography variant="body1">
        Para crear una <TextEmphasis>nueva solicitud</TextEmphasis>, llena los
        siguientes campos:
      </Typography>

      <RequestForm />

      {/* <StyledAccordion label="Primer paso">
        <Box
          className={classes["accordion-content"]}
          component="form"
          noValidate
          autoComplete="off"
          menuprops={{
            disableScrollLock: true,
          }}
        >
          <Typography variant="h2" fontWeight="bold">
            Práctica<i className="ri-information-line"></i>
          </Typography>
          <TextField
            id="outlined-select-currency"
            select
            fullWidth
            label="Práctica"
            helperText="Selecciona una de las prácticas"
            defaultValue=""
          >
            {practicas.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" sx={{ mx: "auto" }}>
            Confirmar
          </Button>
        </Box>
      </StyledAccordion>

      <StyledAccordion label="Reactivos">
        <Box className={classes["accordion-content"]}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead className={classes["table-head"]}>
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
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" sx={{ mx: "auto" }}>
            Confirmar
          </Button>
        </Box>
      </StyledAccordion> */}
    </Box>
  );
};
