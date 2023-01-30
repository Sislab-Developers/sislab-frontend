import * as React from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#00C795",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#00C795",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "light",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00C795",
    },
  },
});

export function InputEmail({ correoRef }) {
  return (
    <CssTextField
      // html input attribute
      name="Inpt_email"
      type="email"
      placeholder="correo@email.com"
      // pass down to FormLabel as children
      label="Correo electrónico"
      id="Inpt_email"
      style={{ width: 340 }}
      required
    />
  );
}
