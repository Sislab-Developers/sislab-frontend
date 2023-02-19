import { useTheme } from "@mui/material";
import { MaestroHeader } from "../components";

export const SolicitudesCreadas = () => {
  const theme = useTheme();

  const content = (
    <>
      {/* <MaestroHeader colorSolicitudes="solicitudes-color" /> */}
      <div className="content">
        <div className="title">
          <h1>
            <span style={{ color: theme.palette.primary.main }}>
              Solicitudes
            </span>{" "}
            creadas
          </h1>
        </div>
      </div>
    </>
  );

  return content;
};
