import { Button } from "@mui/material";

export const CustomButton = (props) => {
  return (
    <Button
      style={{
        borderRadius: 13,
        backgroundColor: "#00C795",
        padding: "10px 42px",
        fontSize: "18px",
        textTransform: "none",
        fontWeight: "regular",
        width: 150,
        height: 50,
      }}
      variant="contained"
      size="large"
      id="Btn_login"
    >
      {props.text}
    </Button>
  );
};
