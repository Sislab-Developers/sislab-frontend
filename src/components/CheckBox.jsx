import { FormControlLabel, Checkbox } from "@mui/material";

export const CustomCheckBox = () => {
  return (
    <box>
      <box>
        <FormControlLabel
          label={
            <span style={{ fontSize: "14px", color: "#333333" }}>
              {"Mantener sesión iniciada"}
            </span>
          }
          sx={{ "& .MuiSvgIcon-root": { fontSize: 18, color: "#00C795" } }}
          control={<Checkbox />}
        />
      </box>
    </box>
  );
};
