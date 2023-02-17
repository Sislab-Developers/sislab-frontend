import { useRef } from "react";
import { MisGruposForm } from "../components";
import instance from "../utils/axiosConfig";

export const MisGrupos = () => {
  const nombreRef = useRef();
  const laboratorioRef = useRef();
  const carreraRef = useRef();
  const materiaRef = useRef();
  const numAlumnosRef = useRef();
  const numEquiposRef = useRef();
  const diaSemanaRef = useRef();
  const horaRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let horaDato = horaRef.current.value;
    let simboloEncontrado = false;
    let horaArr = horaDato.split(" ");
    let horaInicialArr = [];
    let horaFinalArr = [];

    for (let i = 0; i < horaArr.length; i++) {
      if (horaArr[i] === "-") {
        simboloEncontrado = true;
      } else if (simboloEncontrado === false) {
        horaInicialArr.push(horaArr[i]);
      } else if (simboloEncontrado) {
        horaFinalArr.push(horaArr[i]);
      }
    }

    const { value: nombre } = nombreRef.current;
    const { value: laboratorio } = laboratorioRef.current;
    const { value: carrera } = carreraRef.current;
    const { value: materia } = materiaRef.current;
    const { value: numAlumnos } = numAlumnosRef.current;
    const { value: numEquipos } = numEquiposRef.current;
    const { value: diaSemana } = diaSemanaRef.current;
    const horaInicial = horaInicialArr.join("");
    const horaFinal = horaFinalArr.join("");

    await instance
      .post(`api/grupos/`, {
        nombre,
        laboratorio,
        carrera,
        materia,
        numAlumnos,
        numEquipos,
        diaSemana,
        horaInicial,
        horaFinal,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MisGruposForm
      laboratorioRef={laboratorioRef}
      carreraRef={carreraRef}
      materiaRef={materiaRef}
      numAlumnosRef={numAlumnosRef}
      numEquiposRef={numEquiposRef}
      diaSemanaRef={diaSemanaRef}
      horaRef={horaRef}
      handleSubmit={handleSubmit}
      nombreRef={nombreRef}
    />
  );
};
