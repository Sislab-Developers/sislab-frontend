import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useState } from 'react';
import instance from '../utils/axiosConfig';

export const GroupItem = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({});
  const [total, setTotal] = useState(1);

  const authCtx = useContext(AuthContext);

  const getGrupos = () => {
    instance
      .get('grupos')
      .then((response) => {
        console.log(response);
        setTotal(response.total);
      })
      .catch((error) => {
        console.log(error);
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
          nombre: `G${total} | ${formData.dia} | ${formData.hora}`,
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

  const laboratorios = [
    {
      id: 1,
      label: '5N - 201',
    },
    {
      id: 2,
      label: '5N - 202',
    },
    {
      id: 3,
      label: '5N - 203',
    },
    {
      id: 4,
      label: '5N - 204',
    },
  ];

  const carreras = [
    {
      label: 'Lic. Químico Biólogo Clínico',
    },
    {
      label: 'Lic. Químico en Alimentos',
    },
    {
      label: 'Ing. Industrial y de Sistemas',
    },
    {
      label: 'Ing. Minero',
    },
    {
      label: 'Lic. Geología',
    },
    {
      label: 'Ing. Civil',
    },
    {
      label: 'Ing. Mecatrónica',
    },
    {
      label: 'Ing. Materiales',
    },
    {
      label: 'Ing. Sistemas de Información',
    },
    {
      label: 'Ing. Energías Renovables',
    },
    {
      label: 'Ing. Biomédica',
    },
    {
      label: 'Ing. Química',
    },
    {
      label: 'Tronco común biológicas',
    },
    {
      label: 'Tronco común ingenierías',
    },
  ];

  const materias = [
    {
      label: '6883 | Química I',
    },
    {
      label: '9400 |  Química I',
    },
    {
      label: '7162 |  Química General',
    },
    {
      label: '05859 | Química General',
    },
    {
      label: '07791 | Química Inorgánica',
    },
    {
      label: '08150 | Fundamentos de Química',
    },
  ];

  const dias = [
    {
      label: 'Lunes',
    },
    {
      label: 'Martes',
    },
    {
      label: 'Miércoles',
    },
    {
      label: 'Jueves',
    },
    {
      label: 'Viernes',
    },
  ];

  const hora = [
    {
      label: '7:00 a.m - 9:00 a.m.',
    },
    {
      label: '8:00 a.m - 10:00 a.m.',
    },
    {
      label: '9:00 a.m - 11:00 a.m.',
    },
    {
      label: '11:00 a.m - 1:00 p.m.',
    },
    {
      label: '12:00 p.m - 2:00 p.m.',
    },
    {
      label: '1:00 p.m - 3:00 p.m.',
    },
    {
      label: '2:00 p.m - 4:00 p.m.',
    },
    {
      label: '3:00 p.m - 5:00 p.m.',
    },
    {
      label: '4:00 p.m - 6:00 p.m.',
    },
    {
      label: '5:00 p.m - 7:00 p.m.',
    },
    {
      label: '6:00 p.m - 8:00 p.m.',
    },
    {
      label: '7:00 p.m - 9:00 p.m.',
    },
  ];

  return (
    <div className="accordion">
      <Accordion expanded={isExpanded} onChange={handleExpanded}>
        <AccordionSummary
          expandIcon={isExpanded && <ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {!isExpanded ? (
            <i className="ri-add-line" style={{ margin: ' auto' }}></i>
          ) : (
            <>
              <Typography>
                G{total ? total : '...'} | {formData.dia ? formData.dia : '...'}{' '}
                | {formData.hora ? formData.hora : '...'}
              </Typography>
            </>
          )}
        </AccordionSummary>
        <div className="centerComboBox">
          <AccordionDetails>
            <Box
              sx={{
                '& .MuiTextField-root': { width: '32ch' },
              }}
              noValidate
              autoComplete="off"
              menuprops={{
                disablescrolllock: 'true',
              }}
            >
              <form onSubmit={handleSubmit}>
                <h1>
                  Laboratorio<i className="ri-information-line"></i>
                </h1>
                <TextField
                  select
                  name="laboratorio"
                  label="Laboratorio"
                  defaultValue=""
                  onChange={(e) => handle(e)}
                  helperText="Escribe el laboratorio"
                >
                  {laboratorios.map((option) => (
                    <MenuItem key={option.id} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <br />
                <br />
                <h1>
                  Carrera<i className="ri-information-line"></i>
                </h1>
                <TextField
                  name="carrera"
                  select
                  label="Carrera"
                  defaultValue=""
                  onChange={(e) => handle(e)}
                  helperText="Selecciona la carrera de este grupo"
                >
                  {carreras.map((option) => (
                    <MenuItem
                      key={option.label}
                      value={option.label}
                      disablescrolllock="true"
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <br />
                <br />
                <h1>
                  Materia<i className="ri-information-line"></i>
                </h1>
                <TextField
                  name="materia"
                  select
                  label="Materia"
                  defaultValue=""
                  onChange={(e) => handle(e)}
                  helperText="Selecciona la materia de este grupo"
                >
                  {materias.map((option) => (
                    <MenuItem key={option.label} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <br />
                <br />
                <h1>
                  Número de alumnos<i className="ri-information-line"></i>
                </h1>
                <TextField
                  name="alumnos"
                  label="Número de alumnos"
                  value={formData?.alumnos}
                  onChange={(e) => handle(e)}
                  helperText="Escribe el número de alumnos"
                ></TextField>

                <h1>
                  Número de equipos<i className="ri-information-line"></i>
                </h1>
                <TextField
                  name="equipos"
                  label="Número de equipos"
                  value={formData?.equipos}
                  onChange={(e) => handle(e)}
                  helperText="Escribe el número de equipos"
                ></TextField>
                <br />
                <br />

                <h1>
                  Día de la semana<i className="ri-information-line"></i>
                </h1>
                <TextField
                  name="dia"
                  select
                  label="Día de la semana"
                  defaultValue=""
                  onChange={(e) => handle(e)}
                  helperText="Selecciona el día de la semana"
                >
                  {dias.map((option) => (
                    <MenuItem key={option.id} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <br />
                <br />
                <h1>
                  Hora de clase<i className="ri-information-line"></i>
                </h1>
                <TextField
                  name="hora"
                  select
                  label="Hora de clase"
                  defaultValue=""
                  onChange={(e) => handle(e)}
                  helperText="Selecciona la hora de clase de este grupo"
                >
                  {hora.map((option) => (
                    <MenuItem key={option.label} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <div id="boton-confirmar">
                  <Button
                    style={{
                      borderRadius: 13,
                      backgroundColor: '#00C795',
                      padding: '10px 32px',
                      fontSize: '16px',
                      textTransform: 'none',
                      fontWeight: 'regular',
                      width: 140,
                      height: 45,
                    }}
                    variant="contained"
                    size="large"
                    id="Btn_login"
                    type="submit"
                  >
                    {'Confirmar'}
                  </Button>
                </div>
              </form>
            </Box>
          </AccordionDetails>
        </div>
      </Accordion>
    </div>
  );
};
