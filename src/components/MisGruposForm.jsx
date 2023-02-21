import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import { Button, useTheme } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

export const MisGruposForm = ({
  handleSubmit,
  nombreRef,
  laboratorioRef,
  carreraRef,
  materiaRef,
  numAlumnosRef,
  numEquiposRef,
  diaSemanaRef,
  horaRef,
}) => {
  const theme = useTheme();

  const laboratorios = [
    {
      label: '5N - 201',
    },
    {
      label: '5N - 202',
    },
    {
      label: '5N - 203',
    },
    {
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
    <>
      <div className="content">
        <div className="title">
          <h1>
            Mis{' '}
            <span style={{ color: theme.palette.primary.main }}>grupos</span>
          </h1>
        </div>
        <div className="subtitle">
          <h1>
            Llena este formulario para crear tu primer{' '}
            <span className="color_en_texto">grupo</span>
          </h1>
        </div>

        <div className="contentWrapper">
          <div className="accordion">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Primer paso</Typography>
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
                        Nombre<i className="ri-information-line"></i>
                      </h1>
                      <TextField
                        id="outlined-select-currency"
                        label="Nombre del grupo"
                        defaultValue=""
                        inputRef={nombreRef}
                        helperText="Escribe el nombre del equipo"
                      ></TextField>
                      <br />
                      <br />
                      <h1>
                        Laboratorio<i className="ri-information-line"></i>
                      </h1>
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Laboratorio"
                        defaultValue=""
                        inputRef={laboratorioRef}
                        helperText="Selecciona el laboratorio de este grupo"
                      >
                        {laboratorios.map((option) => (
                          <MenuItem key={option.label} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <br></br>
                      <br></br>
                      <h1>
                        Carrera<i className="ri-information-line"></i>
                      </h1>
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Carrera"
                        defaultValue=""
                        inputRef={carreraRef}
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
                      <br></br>
                      <br></br>
                      <h1>
                        Materia<i className="ri-information-line"></i>
                      </h1>
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Materia"
                        defaultValue=""
                        inputRef={materiaRef}
                        helperText="Selecciona la materia de este grupo"
                      >
                        {materias.map((option) => (
                          <MenuItem key={option.label} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <br></br>
                      <br></br>
                      <h1>
                        Número de alumnos<i className="ri-information-line"></i>
                      </h1>
                      <TextField
                        id="outlined-select-currency"
                        label="Número de alumnos"
                        defaultValue=""
                        inputRef={numAlumnosRef}
                        helperText="Escribe el número de alumnos"
                      ></TextField>
                      <br></br>
                      <br></br>
                      <h1>
                        Número de equipos<i className="ri-information-line"></i>
                      </h1>
                      <TextField
                        id="outlined-select-currency"
                        label="Número de equipos"
                        defaultValue=""
                        inputRef={numEquiposRef}
                        helperText="Escribe el número de equipos"
                      ></TextField>
                      <br></br>
                      <br></br>
                      <h1>
                        Día de la semana<i className="ri-information-line"></i>
                      </h1>
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Día de la semana"
                        defaultValue=""
                        inputRef={diaSemanaRef}
                        helperText="Selecciona el día de la semana"
                      >
                        {dias.map((option) => (
                          <MenuItem key={option.label} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <br></br>
                      <br></br>
                      <h1>
                        Hora de clase<i className="ri-information-line"></i>
                      </h1>
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Hora de clase"
                        defaultValue=""
                        inputRef={horaRef}
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
        </div>
      </div>
    </>
  );
};
