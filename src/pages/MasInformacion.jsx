import { MaestroHeader } from "../components";

export const MasInformacion = () => {
  const content = (
    <>
      <MaestroHeader colorInformacion="informacion-color" />
      <div className="content">
        <div className="title">
          <h1>Más información</h1>
        </div>
      </div>
    </>
  );

  return content;
};
