import { useState } from "react";

import {
  Box,
  Button,
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
      <Table headTitles={["Residuo", "Envase", "Tratamiento", ""]}>
        {waste.length > 0 ? (
          waste.map((waste) => (
            <TableRow key={waste.residue}>
              <TableCell>{waste.residue}</TableCell>
              <TableCell align="right">{waste.container || "--"}</TableCell>
              <TableCell align="right">{waste.treatment || "--"}</TableCell>
              <TableCell align="right" sx={{ px: "0.5rem" }}>
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
            <TableCell colSpan={3}>
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
        flexDirection: { xs: "column", sm: "row" },
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
      <Button variant="contained" onClick={handleSubmit}>
        <Add sx={{ color: "white" }} />
      </Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Box>
  );
};
