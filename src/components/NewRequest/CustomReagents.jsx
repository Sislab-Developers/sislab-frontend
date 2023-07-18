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
import { Table } from "../Table/Table";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { InfoLabel } from "../InfoLabel/InfoLabel";

export const CustomReagents = ({
  reagents = [],
  onAddReagent,
  onDeleteReagent,
}) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleDeleteReagent = (reagent) => {
    onDeleteReagent(reagent);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <InfoLabel tooltip="Aquí se encuentran los reactivos extra. Si cometiste un error, puedes eliminarlos haciendo clic sobre uno de ellos">
        <TextEmphasis>Reactivos</TextEmphasis> personalizados
      </InfoLabel>
      <Table
        tableHead={
          <TableRow>
            <TableCell>Reactivo</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Medida</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        }
      >
        {reagents.length > 0 ? (
          reagents.map((reagent, index) => (
            <TableRow key={`Custom reagent ${index}: ${reagent.reagent}`}>
              <TableCell>{reagent.reagent}</TableCell>
              <TableCell align="right">{reagent.quantity}</TableCell>
              <TableCell align="right">{reagent.unit}</TableCell>
              <TableCell align="right" sx={{ px: "0.5rem" }}>
                <Tooltip title="Haz clic para eliminar el reactivo">
                  <IconButton
                    size="small"
                    onClick={handleDeleteReagent.bind(null, reagent)}
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
                No se han añadido <TextEmphasis>reactivos</TextEmphasis>{" "}
                personalizados
              </Typography>
            </TableCell>
          </TableRow>
        )}
      </Table>
      {!isMobile && (
        <Typography>
          Agregar <TextEmphasis>reactivo</TextEmphasis> personalizado
        </Typography>
      )}
      <ReagentForm onSubmit={onAddReagent} />
    </Box>
  );
};

const ReagentForm = ({ onSubmit }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [reagent, setReagent] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [error, setError] = useState(null);

  const handleReagentChange = (event) => {
    setError(null);
    setReagent(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setError(null);
    setQuantity(event.target.value);
  };

  const handleUnitChange = (event) => {
    setError(null);
    setUnit(event.target.value);
  };

  const clearForm = () => {
    setReagent("");
    setQuantity("");
    setUnit("");
  };

  const handleSubmit = () => {
    setError(null);

    if (
      reagent.trim().length < 1 ||
      quantity.trim().length < 1 ||
      unit.trim().length < 1
    ) {
      setError("Por favor, rellena todos los campos.");
      return;
    }

    onSubmit({
      reagent,
      quantity,
      unit,
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
          Agregar <TextEmphasis>reactivo personalizado</TextEmphasis>
        </Typography>
      )}
      <TextField
        label="Reactivo"
        placeholder="ej. NaOH"
        value={reagent}
        onChange={handleReagentChange}
      />
      <TextField
        label="Cantidad"
        placeholder="ej. 10"
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
      />
      <TextField
        label="Medida"
        placeholder="ej. g"
        value={unit}
        onChange={handleUnitChange}
      />
      <Button variant="contained" onClick={handleSubmit}>
        <Add sx={{ color: "white" }} />
      </Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Box>
  );
};
