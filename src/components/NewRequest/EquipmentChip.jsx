import { Chip } from "@mui/material";

export const EquipmentChip = ({ label, onDelete, custom = false }) => {
  return (
    <Chip
      variant={custom ? "outlined" : "filled"}
      color="primary"
      label={label}
      onDelete={onDelete}
      sx={{
        margin: "4px",
      }}
    />
  );
};
