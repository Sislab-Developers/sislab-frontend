import { useState } from "react";

import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

import { TextEmphasis } from "../TextEmphasis";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { Table } from "../Table/Table";

export const CustomWaste = ({ waste = [], onAddWaste, onDeleteWaste }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleDeleteWaste = (waste) => {
    onDeleteWaste(waste);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Typography>
        <TextEmphasis>Residuos</TextEmphasis> personalizados
      </Typography>
      <Table
        tableHead={
          <TableRow>
            <TableCell>Residuo</TableCell>
            <TableCell align="right">Envase</TableCell>
            <TableCell align="right">Tratamiento</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        }
      >
        {waste.length > 0 ? (
          waste.map((waste) => (
            <TableRow key={waste.residue}>
              <TableCell>{waste.residue}</TableCell>
              <TableCell align="right">{waste.container || "--"}</TableCell>
              <TableCell align="right">{waste.treatment || "--"}</TableCell>
              <TableCell align="right" sx={{ px: "0.5rem", minWidth: "3.5em" }}>
                <Tooltip title="Haz clic para eliminar el residuo">
                  <IconButton
                    size="small"
                    onClick={handleDeleteWaste.bind(null, waste)}
                  >
                    <Delete color="error" sx={{ cursor: "pointer" }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4}>
              <Typography textAlign="center">
                No se han añadido <TextEmphasis>residuos</TextEmphasis>{" "}
                personalizados
              </Typography>
            </TableCell>
          </TableRow>
        )}
      </Table>
      {!isMobile && (
        <Typography>
          Agregar <TextEmphasis>residuo</TextEmphasis> personalizado
        </Typography>
      )}
      <WasteForm onSubmit={onAddWaste} />
    </Box>
  );
};

const WasteForm = ({ onSubmit }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [waste, setWaste] = useState("");
  const [container, setContainer] = useState("");
  const [treatment, setTreatment] = useState("");
  const [error, setError] = useState(null);

  const handleWasteChange = (event) => {
    setError(null);
    setWaste(event.target.value);
  };

  const handleContainerChange = (event) => {
    setError(null);
    setContainer(event.target.value);
  };

  const handleTreatmentChange = (event) => {
    setError(null);
    setTreatment(event.target.value);
  };

  const clearForm = () => {
    setWaste("");
    setContainer("");
    setTreatment("");
  };

  const handleSubmit = () => {
    setError(null);

    if (
      waste.trim().length < 1 ||
      container.trim().length < 1 ||
      treatment.trim().length < 1
    ) {
      setError("Por favor, rellena todos los campos.");
      return;
    }

    onSubmit({
      residue: waste,
      container,
      treatment,
    });
    clearForm();
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.grey.main,
        border: "1px solid #ccc",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.5rem",
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") handleSubmit();
      }}
    >
      {isMobile && (
        <Typography>
          Agregar <TextEmphasis>residuo personalizado</TextEmphasis>
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          width: { xs: "100%", sm: "auto" },
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { sm: "center" },
          gap: "0.75rem",
          mx: "auto",
        }}
      >
        <TextField
          label="Residuo"
          placeholder="ej. HCl"
          value={waste}
          onChange={handleWasteChange}
        />
        <TextField
          label="Envase"
          placeholder="ej. Frasco"
          value={container}
          onChange={handleContainerChange}
        />
        <TextField
          label="Tratamiento"
          placeholder="ej. Neutralizar"
          value={treatment}
          onChange={handleTreatmentChange}
        />
        <IconButton
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: theme.palette.primary.main,
            borderRadius: { xs: "8px", sm: "50%" },
          }}
        >
          <Add sx={{ color: "white" }} />
        </IconButton>
      </Box>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Box>
  );
};
