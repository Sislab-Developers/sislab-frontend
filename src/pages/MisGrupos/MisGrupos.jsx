import { useContext, useRef } from 'react';
import { MisGruposForm } from '../../components';
import AuthContext from '../../context/AuthContext';
import { getToken } from '../../utils';
import instance from '../../utils/axiosConfig';

export const MisGrupos = () => {
  const authCtx = useContext(AuthContext);

  //const nombreRef = "prue";

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
    let horaArr = horaDato.split(' ');
    let horaInicialArr = [];
    let horaFinalArr = [];

    for (let i = 0; i < horaArr.length; i++) {
      if (horaArr[i] === '-') {
        simboloEncontrado = true;
      } else if (simboloEncontrado === false) {
        horaInicialArr.push(horaArr[i]);
      } else if (simboloEncontrado) {
        horaFinalArr.push(horaArr[i]);
      }
    }

    const nombre = 'ejemplo';

    const { value: laboratorio } = laboratorioRef.current;
    const { value: carrera } = carreraRef.current;
    const { value: materia } = materiaRef.current;
    const { value: numAlumnos } = numAlumnosRef.current;
    const { value: numEquipos } = numEquiposRef.current;
    const { value: diaSemana } = diaSemanaRef.current;

    const horaInicial = horaInicialArr.join('');
    const horaFinal = horaFinalArr.join('');

    instance
      .post(
        `api/grupos`,
        {
          nombre,
          laboratorio,
          carrera,
          materia,
          numAlumnos,
          numEquipos,
          diaSemana,
          horaInicial,
          horaFinal,
          uid: getToken(null, true),
        },
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      )

      .then((response) => {
        console.log('simon' + response);
      })
      .catch((err) => {
        console.log('nel apa' + err.response.data);
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
      // nombreRef={nombreRef}
    />
  );
};
