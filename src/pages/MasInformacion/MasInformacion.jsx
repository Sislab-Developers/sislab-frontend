import { Box, Typography } from "@mui/material";

import { TextEmphasis } from "../../components/TextEmphasis";

export const MasInformacion = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Typography variant="h1">
        Más <TextEmphasis>información</TextEmphasis>
      </Typography>
      <Typography>
        Bienvenido al{" "}
        <TextEmphasis>Sistema de Laboratorios (SISLAB)</TextEmphasis> del{" "}
        <TextEmphasis>Departamento de Ingeniería Química</TextEmphasis> de la{" "}
        <TextEmphasis>Universidad de Sonora</TextEmphasis>. Este sistema fue
        desarrollado entre los años 2022 y 2023 por un dedicado grupo de
        estudiantes pertenecientes al laboratorio{" "}
        <TextEmphasis color="#7145d6">CSI PRO</TextEmphasis>, dentro de la
        carrera de{" "}
        <TextEmphasis color="#7145d6">
          Ingeniería en Sistemas de Información
        </TextEmphasis>
        .
      </Typography>
      <Typography>
        El objetivo principal de este sistema es facilitar y agilizar el control
        de las actividades que se llevan a cabo en los laboratorios del{" "}
        <TextEmphasis>Departamento de Ingeniería Química</TextEmphasis>. Con
        esta herramienta, se busca optimizar la gestión de recursos, mejorar la
        coordinación entre los diferentes equipos de trabajo y promover un
        ambiente de trabajo más eficiente.
      </Typography>
      <Typography>
        Este sistema sigue en constante mantenimiento y evolución. Agradecemos
        tus sugerencias y comentarios, los cuales nos ayudan a mejorar la
        plataforma. Si deseas hacer alguna recomendación, te invitamos a
        contactarnos a través del equipo de laboratoristas. Valoramos tu
        participación en el desarrollo continuo de este proyecto.
      </Typography>
    </Box>
  );
};
