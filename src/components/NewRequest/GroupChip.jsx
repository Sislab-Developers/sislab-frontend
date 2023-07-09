import { Chip } from "@mui/material";

export const GroupChip = ({ label, selected, clickable = false, onClick }) => (
  <Chip
    label={label}
    onClick={onClick}
    clickable={clickable}
    color={selected ? "primary" : "default"}
    sx={{ mx: "0.25rem" }}
  />
);
