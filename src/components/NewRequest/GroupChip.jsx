import { Chip } from "@mui/material";

export const GroupChip = ({ label, selected, onClick }) => (
  <Chip
    label={label}
    onClick={onClick}
    clickable
    color={selected ? "primary" : "default"}
  />
);
