import { Button } from "@mui/material";

export const CustomButton = (props) => {
  return (
    <Button
      style={{
        borderRadius: 13,
        backgroundColor: "#00C795",
        padding: "10px 32px",
        fontSize: "16px",
        textTransform: "none",
        fontWeight: "regular",
        width: 140,
        height: 40,
      }}
      variant="contained"
      size="large"
      id="Btn_login"
    >
      {props.text}
    </Button>
  );
};
