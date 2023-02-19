import { useTheme } from "@mui/material";
import { MaestroHeader } from "../components";

export const MasInformacion = () => {
  const theme = useTheme();

  const content = (
    <>
      {/* <MaestroHeader colorInformacion="informacion-color" /> */}
      <div className="content">
        <div className="title">
          <h1>
            Más{" "}
            <span style={{ color: theme.palette.primary.main }}>
              información
            </span>
          </h1>
        </div>
      </div>
    </>
  );

  return content;
};
