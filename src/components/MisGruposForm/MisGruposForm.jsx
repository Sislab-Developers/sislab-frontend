import style from './MisGruposForm.module.scss';

import { GroupItem } from '../GroupItem/GroupItem';
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { useState } from 'react';
import instance from '../../utils/axiosConfig';
import React from 'react';

export const MisGruposForm = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({});
  const [total, setTotal] = useState();
  const [grupos, setGrupos] = useState();
  const [loading, setLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const getGrupos = () => {
    setLoading(true);

    instance
      .get('grupos')
      .then((response) => {
        console.log(response);
        setTotal(response.total);
        setGrupos(response.grupos);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getGrupos();
  }, []);

  const handleExpanded = () => {
    setIsExpanded((isExpanded) => !isExpanded);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    instance
      .post(
        `grupos`,
        {
          nombre: `G${total + 1} | ${formData.dia} | ${formData.hora}`,
          laboratorio: formData.laboratorio,
          materia: formData.materia,
          carrera: formData.carrera,
          alumnos: formData.alumnos,
          equipos: formData.equipos,
          dia: formData.dia,
          hora: formData.hora,
          usuario: authCtx?.user?.uid,
        },
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handle(e) {
    const newdata = { ...formData };
    newdata[e.target.name] = e.target.value;
    setFormData(newdata);
  }

  return (
    <>
      <div className={style.title}>
        <h1>Mis grupos</h1>
        <h1>Semestre 2023-1</h1>
      </div>
      <div className={style.subtitle}>
        <h1>
          Llena este formulario para crear tu primer{' '}
          <span className="color_en_texto">grupo</span>
        </h1>
      </div>

      <GroupItem
        loading={loading}
        isExpanded={isExpanded}
        handleExpanded={handleExpanded}
        total={total}
        formData={formData}
        handleSubmit={handleSubmit}
        handle={handle}
        grupos={grupos}
      />
    </>
  );
};
