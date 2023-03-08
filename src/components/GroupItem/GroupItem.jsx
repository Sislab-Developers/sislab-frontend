import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import { Button, DialogTitle, Skeleton, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { Modal } from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';

import style from './GroupItem.module.scss';
import check from '../../assets/img/check.svg';
import { useContext } from 'react';
import SnackBarContext from '../../context/SnackBar/SnackBarContext';
import CustomSnackbar from '../CustomSnackBar';

export const GroupItem = ({
  isExpanded,
  handleExpanded,
  total,
  formData,
  handleSubmit,
  handle,
  grupos,
  loading,
}) => {
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

  const { isShowing, toggle } = useModal();

  const { setOpen, setMessage } = useContext(SnackBarContext);

  const handleClick = () => {
    setOpen(true);
    setMessage('Hello, Snackbar!');
    console.log('ey simon qp contigo');
  };

  return (
    <>
      {loading &&
        Array.from(Array(3).keys()).map((i) => (
          <Skeleton
            key={i}
            animation="pulse"
            variant="rounded"
            sx={{
              margin: '8px auto',
              animationDelay: `${i * 0.08}s`,
              animationDuration: '1s',
            }}
            height={40}
          />
        ))}

      {!loading &&
        grupos?.map((element, key) => (
          <div className={style.contentWrapper}>
            <Accordion
              sx={{
                maxWidth: '90%',
                width: '600px',
                marginTop: '10px',
                marginBottom: '10px',
              }}
            >
              <AccordionSummary
                key={key}
                disablegutters="true"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{element?.nombre}</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Box
                  noValidate
                  autoComplete="off"
                  menuprops={{
                    disablescrolllock: 'true',
                  }}
                  sx={{
                    '& .MuiTextField-root': {
                      display: 'flex',
                      justifyContent: 'center',
                      maxWidth: '100%',
                    },
                  }}
                >
                  <h1>
                    Laboratorio<i className="ri-information-line"></i>
                  </h1>
                  <TextField
                    select
                    required
                    disabled
                    name="laboratorio"
                    label={element?.laboratorio}
                    defaultValue={element?.laboratorio}
                    helperText="Escribe el laboratorio"
                  >
                    {laboratorios.map((option) => (
                      <MenuItem key={option.id} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <h1>
                    Carrera<i className="ri-information-line"></i>
                  </h1>
                  <TextField
                    select
                    disabled
                    required
                    name="carrera"
                    defaultValue={element?.carrera}
                    label={element?.carrera}
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

                  <h1>
                    Materia<i className="ri-information-line"></i>
                  </h1>
                  <TextField
                    name="materia"
                    select
                    disabled
                    required
                    defaultValue={element?.materia}
                    label={element?.materia}
                    helperText="Selecciona la materia de este grupo"
                  >
                    {materias.map((option) => (
                      <MenuItem key={option.label} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <h1>
                    Número de alumnos<i className="ri-information-line"></i>
                  </h1>
                  <TextField
                    name="alumnos"
                    type="number"
                    required
                    disabled
                    defaultValue={element?.alumnos || ''}
                    helperText="Escribe el número de alumnos"
                  ></TextField>

                  <h1>
                    Número de equipos<i className="ri-information-line"></i>
                  </h1>
                  <TextField
                    name="equipos"
                    type="number"
                    required
                    disabled
                    defaultValue={element?.equipos || ''}
                    helperText="Escribe el número de equipos"
                  ></TextField>

                  <h1>
                    Día de la semana<i className="ri-information-line"></i>
                  </h1>
                  <TextField
                    select
                    required
                    disabled
                    name="dia"
                    defaultValue={element?.dia}
                    label={element?.dia}
                    helperText="Selecciona el día de la semana"
                  >
                    {dias.map((option) => (
                      <MenuItem key={option.id} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <h1>
                    Hora de clase<i className="ri-information-line"></i>
                  </h1>
                  <TextField
                    required
                    name="hora"
                    select
                    disabled
                    defaultValue={element?.hora}
                    label={element?.hora}
                    helperText="Selecciona la hora de clase de este grupo"
                  >
                    {hora.map((option) => (
                      <MenuItem key={option.label} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}

      <div className={style.contentWrapper}>
        <Accordion
          sx={{
            maxWidth: '90%',
            width: '500px',
            marginTop: '20px',
            marginBottom: '20px',
          }}
          disablegutters="true"
          onChange={handleExpanded}
        >
          <AccordionSummary
            expanded={isExpanded}
            expandIcon={isExpanded && <ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {!isExpanded ? (
              <i className="ri-add-line" style={{ margin: ' auto' }}></i>
            ) : (
              <>
                <Typography>
                  G{total ? total + 1 : '...'} |{' '}
                  {formData.dia ? formData.dia : '...'} |{' '}
                  {formData.hora ? formData.hora : '...'}
                </Typography>
              </>
            )}
          </AccordionSummary>

          <AccordionDetails>
            <Box
              sx={{
                '& .MuiTextField-root': {
                  display: 'flex',
                  justifyContent: 'center',
                  maxWidth: '100%',
                },
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
                  required
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

                <h1>
                  Carrera<i className="ri-information-line"></i>
                </h1>
                <TextField
                  name="carrera"
                  required
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

                <h1>
                  Materia<i className="ri-information-line"></i>
                </h1>
                <TextField
                  required
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

                <h1>
                  Número de alumnos<i className="ri-information-line"></i>
                </h1>
                <TextField
                  name="alumnos"
                  required
                  type="number"
                  label="Número de alumnos"
                  value={formData?.alumnos || ''}
                  onChange={(e) => handle(e)}
                  helperText="Escribe el número de alumnos"
                ></TextField>

                <h1>
                  Número de equipos<i className="ri-information-line"></i>
                </h1>
                <TextField
                  required
                  name="equipos"
                  type="number"
                  label="Número de equipos"
                  value={formData?.equipos || ''}
                  onChange={(e) => handle(e)}
                  helperText="Escribe el número de equipos"
                ></TextField>

                <h1>
                  Día de la semana<i className="ri-information-line"></i>
                </h1>
                <TextField
                  required
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

                <h1>
                  Hora de clase<i className="ri-information-line"></i>
                </h1>
                <TextField
                  required
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
                <Typography align="center" sx={{ marginTop: '15px' }}>
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
                    onClick={toggle}
                  >
                    {'Confirmar'}
                  </Button>
                </Typography>
              </form>
            </Box>
          </AccordionDetails>
        </Accordion>
      </div>

      <Modal isShowing={isShowing} hide={toggle}>
        <Typography
          align="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap="5px"
        >
          <img src={check} alt="Check icon" height="75" width="120" />
          <DialogTitle>{'Nuevo grupo creado con éxito'}</DialogTitle>
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
            onClick={toggle}
          >
            {'Cerrar'}
          </Button>
        </Typography>
      </Modal>

      <CustomSnackbar />

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
        onClick={handleClick}
      >
        {'Confirmar'}
      </Button>
    </>
  );
};
