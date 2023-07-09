import { useState } from "react";

import { Box, Button, TextField, Typography, useTheme } from "@mui/material";

import { TextEmphasis } from "../TextEmphasis";

export const EquipmentForm = ({ onSubmit }) => {
  const theme = useTheme();

  const [equipment, setEquipment] = useState("");
  const [error, setError] = useState(null);

  const handleEquipmentChange = (event) => {
    setError(null);
    setEquipment(event.target.value);
  };

  const handleSubmit = () => {
    setError(null);

    if (equipment.trim().length < 1) {
      setError("Por favor, ingresa el nombre del equipo.");
      return;
    }

    onSubmit(equipment);
    setEquipment("");
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.grey.main,
        border: "1px solid #ccc",
        borderRadius: "0.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        padding: "0.75rem",
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") handleSubmit();
      }}
    >
      <Typography>
        Agregar <TextEmphasis>equipo de laboratorio</TextEmphasis> personalizado
      </Typography>
      <TextField
        label="Equipo"
        placeholder="ej. Bomba de vacío"
        name="equipment"
        error={!!error}
        value={equipment}
        onChange={handleEquipmentChange}
        helperText={error}
      />
      <Button variant="contained" size="large" onClick={handleSubmit}>
        Agregar
      </Button>
    </Box>
  );
};
