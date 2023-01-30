import { MaestroHeader } from "../components";

export const SolicitudesCreadas = () => {
  const content = (
    <>
      <MaestroHeader colorSolicitudes="solicitudes-color" />
      <div className="content">
        <div className="title">
          <h1>Solicitudes Creadas</h1>
        </div>
      </div>
    </>
  );

  return content;
};
