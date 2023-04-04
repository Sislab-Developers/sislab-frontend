import { useState, useCallback, useEffect, useContext } from 'react';

import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import check from '../../assets/img/check.svg';

import instance from '../../utils/axiosConfig';
import AuthContext from '../../context/AuthContext';
import SnackbarContext from '../../context/SnackBar/SnackBarContext';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../Modal/Modal';
import CustomSnackbar from '../CustomSnackBar';
import { getToken } from '../../utils/authServices';

import {
  getGrupos,
  getLaboratorios,
  getCarreras,
  getMaterias,
  getDias,
  getHoras,
} from '../../api/fetch';

import style from './MisGruposForm.module.scss';

export const MisGruposForm = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({});
  const [total, setTotal] = useState();
  const [grupos, setGrupos] = useState();
  const [laboratorios, setLaboratorios] = useState();
  const [carreras, setCarreras] = useState();
  const [materias, setMaterias] = useState();
  const [dias, setDias] = useState();
  const [horas, setHoras] = useState();
  const [loading, setLoading] = useState(false);

  const { setOpen, setMessage, setSeverity } = useContext(SnackbarContext);

  const { isShowing, toggle } = useModal();

  const authCtx = useContext(AuthContext);

  const uid = getToken(authCtx.token, true).uid;

  const fetchData = useCallback(async (uid) => {
    setLoading(true);
    try {
      const [
        gruposResponse,
        laboratoriosResponse,
        carrerasResponse,
        materiasResponse,
        diasResponse,
        horasResponse,
      ] = await Promise.all([
        getGrupos(uid),
        getLaboratorios(),
        getCarreras(),
        getMaterias(),
        getDias(),
        getHoras(),
      ]);
      setGrupos(gruposResponse?.grupos);
      setTotal(gruposResponse?.total);
      setLaboratorios(laboratoriosResponse?.laboratorios);
      setCarreras(carrerasResponse?.carreras);
      setMaterias(materiasResponse?.materias);
      setDias(diasResponse?.dias);
      setHoras(horasResponse?.horas);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(uid);
  }, [fetchData, uid]);

  const handleExpanded = () => {
    setIsExpanded((isExpanded) => !isExpanded);
  };

  const handleSubmit = (e) => {
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
        toggle();
        setLoading(true);
        getGrupos();
        setIsExpanded(false);
        setFormData({});
      })
      .catch((error) => {
        console.log(error);
        setOpen(true);
        setSeverity('error');
        setMessage(error.msg ? error.msg : error.errors[0].msg);
      })
      .finally(() => {
        setLoading(false);
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
              disablegutters="true"
            >
              <AccordionSummary
                key={key}
                sx={{
                  backgroundColor: '#f2f5f2',
                }}
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
                    {laboratorios ? (
                      laboratorios?.map((option) => (
                        <MenuItem key={option.uid} value={option.laboratorio}>
                          {option.laboratorio}
                        </MenuItem>
                      ))
                    ) : (
                      <div></div>
                    )}
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
                    {carreras ? (
                      carreras.map((option) => (
                        <MenuItem
                          key={option.uid}
                          value={option.carrera}
                          disablescrolllock="true"
                        >
                          {option.carrera}
                        </MenuItem>
                      ))
                    ) : (
                      <div />
                    )}
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
                    {materias ? (
                      materias.map((option) => (
                        <MenuItem key={option.uid} value={option.materia}>
                          {option.materia}
                        </MenuItem>
                      ))
                    ) : (
                      <div />
                    )}
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
                    {dias ? (
                      dias.map((option) => (
                        <MenuItem key={option.uid} value={option.dia}>
                          {option.dia}
                        </MenuItem>
                      ))
                    ) : (
                      <div />
                    )}
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
                    {horas ? (
                      horas.map((option) => (
                        <MenuItem key={option.uid} value={option.horario}>
                          {option.horario}
                        </MenuItem>
                      ))
                    ) : (
                      <div />
                    )}
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
            width: '600px',
            width: '600px',
            marginTop: '20px',
            marginBottom: '20px',
            color: 'white',
          }}
          disablegutters="true"
          expanded={isExpanded}
          onChange={handleExpanded}
        >
          <AccordionSummary
            sx={{
              backgroundColor: '#00c795',
            }}
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
                  value={formData?.laboratorio || ''}
                  onChange={(e) => handle(e)}
                  helperText="Escribe el laboratorio"
                >
                  {laboratorios ? (
                    laboratorios?.map((option) => (
                      <MenuItem key={option.uid} value={option.laboratorio}>
                        {option.laboratorio}
                      </MenuItem>
                    ))
                  ) : (
                    <div />
                  )}
                </TextField>

                <h1>
                  Carrera<i className="ri-information-line"></i>
                </h1>
                <TextField
                  name="carrera"
                  required
                  select
                  label="Carrera"
                  value={formData?.carrera || ''}
                  onChange={(e) => handle(e)}
                  helperText="Selecciona la carrera de este grupo"
                >
                  {carreras ? (
                    carreras.map((option) => (
                      <MenuItem
                        key={option.uid}
                        value={option.carrera}
                        disablescrolllock="true"
                      >
                        {option.carrera}
                      </MenuItem>
                    ))
                  ) : (
                    <div />
                  )}
                </TextField>

                <h1>
                  Materia<i className="ri-information-line"></i>
                </h1>
                <TextField
                  required
                  name="materia"
                  select
                  label="Materia"
                  value={formData?.materia || ''}
                  onChange={(e) => handle(e)}
                  helperText="Selecciona la materia de este grupo"
                >
                  {materias ? (
                    materias.map((option) => (
                      <MenuItem key={option.uid} value={option.materia}>
                        {option.materia}
                      </MenuItem>
                    ))
                  ) : (
                    <div />
                  )}
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
                  value={formData?.dia || ''}
                  onChange={(e) => handle(e)}
                  helperText="Selecciona el día de la semana"
                >
                  {dias ? (
                    dias.map((option) => (
                      <MenuItem key={option.uid} value={option.dia}>
                        {option.dia}
                      </MenuItem>
                    ))
                  ) : (
                    <div />
                  )}
                </TextField>

                <h1>
                  Hora de clase<i className="ri-information-line"></i>
                </h1>
                <TextField
                  required
                  name="hora"
                  select
                  label="Hora de clase"
                  value={formData?.hora || ''}
                  onChange={(e) => handle(e)}
                  helperText="Selecciona la hora de clase de este grupo"
                >
                  {horas ? (
                    horas.map((option) => (
                      <MenuItem key={option.uid} value={option.horario}>
                        {option.horario}
                      </MenuItem>
                    ))
                  ) : (
                    <div />
                  )}
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
                  >
                    {'Confirmar'}
                  </Button>
                </Typography>
              </form>
            </Box>
          </AccordionDetails>
        </Accordion>
      </div>

      <Modal isShowing={isShowing} toggle={toggle}>
        <Typography
          component={'span'}
          variant={'body2'}
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
    </>
  );
};
