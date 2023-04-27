import { CustomButton } from '../../components';
import { useState, useCallback, useEffect, useContext } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chip, Tab, Tabs, useTheme } from '@mui/material';

import AuthContext from '../../context/AuthContext';
import { getToken } from '../../utils/authServices';

import { getGrupos } from '../../api/fetch';
import { Calendario } from '../../components/Calendario';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const practicas = [
  {
    label: 'Práctica 1 | Material y equipo básico de laboratorio',
  },
  {
    label: 'Práctica 2 | Método científico',
  },
  {
    label: 'Práctica 3 | Separación de una mezcla mediante cambios físicos',
  },
  {
    label: 'Práctica 4 | Identificación de metales por ensaye a la flama',
  },
  {
    label: 'Práctica 5 | Compuestos iónicos y covalentes',
  },
  {
    label: 'Práctica 6 | Enlace Metálico',
  },
  {
    label: 'Práctica 7 | Estudio sobre los diferentes tipos de reacciones',
  },
  {
    label: 'Práctica 8 | Undefined',
  },
  {
    label: 'Práctica 9 | Undefined',
  },
  {
    label: 'Práctica 10 | Reacciones de oxidación-reducción',
  },
  {
    label: 'Práctica 11 | Ley de las proporciones definidas',
  },
  {
    label: 'Práctica 12 | Ley de la conservación de la materia',
  },
  {
    label: 'Práctica 13 | Agua de hidratación',
  },
  {
    label: 'Práctica 14 | Determinación de pesos atómicos',
  },
  {
    label: 'Práctica 15 | Estequiometría',
  },
  {
    label: 'Práctica 16 | Estequiometría en la sintesis de NaCI',
  },
  {
    label: 'Práctica 17 | Reactivo limitante',
  },
  {
    label: 'Práctica 18 | Concentración de soluciones',
  },
  {
    label: 'Práctica 19 | Valoración de soluciones I',
  },
  {
    label: 'Práctica 20 | Valoración de soluciones II',
  },
  {
    label: 'Práctica 21 | Peso equivalente del acido fosfórico',
  },
  {
    label: 'Práctica 22 | Peso equivalente de un metal',
  },
  {
    label: 'Práctica personalizada',
  },
];

export const CrearNuevaSolicitud = () => {
  const [grupos, setGrupos] = useState();

  const [selected, setSelected] = useState(null);

  console.log(selected);

  const theme = useTheme();

  const authCtx = useContext(AuthContext);

  const uid = getToken(authCtx.token, true).uid;

  const fetchData = useCallback(async (uid) => {
    try {
      const [gruposResponse] = await Promise.all([getGrupos(uid)]);
      setGrupos(gruposResponse?.grupos);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData(uid);
  }, [fetchData, uid]);

  const content = (
    <Box component="section">
      <div className="title">
        <h1>
          Crear{' '}
          <span style={{ color: theme.palette.primary.main }}>
            nueva solicitud
          </span>
        </h1>
      </div>
      <div className="subtitle">
        <h1>
          Para crear una <span className="color_en_texto">nueva solicitud</span>{' '}
          llena los siguientes campos
        </h1>
      </div>

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
              component="form"
              sx={{
                '& .MuiTextField-root': {
                  minWidth: 'fit-content',
                  maxWidth: '32ch',
                  alignSelf: 'center',
                },
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
              noValidate
              autoComplete="off"
              menuprops={{
                disableScrollLock: true,
              }}
            >
              {grupos ? (
                <Tabs
                  disabled
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                  TabIndicatorProps={{
                    children: (
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <span className="MuiTabs-indicatorChild" />
                      </Box>
                    ),
                  }}
                >
                  {grupos?.map((chip, index) => (
                    <Tab
                      key={chip.uid}
                      value={index || 0}
                      icon={
                        <Chip
                          sx={{ width: 'fill-content', height: 'fill-content' }}
                          label={chip.nombre}
                          value={chip}
                          clickable
                          onClick={() => setSelected(chip)}
                          color={selected === chip ? 'primary' : 'default'}
                        />
                      }
                    />
                  ))}
                </Tabs>
              ) : (
                <div>No tiene grupos, cree uno para continuar</div>
              )}

              <h1>
                Práctica<i className="ri-information-line"></i>
              </h1>
              <TextField
                id="outlined-select-currency"
                select
                label="Practica"
                helperText="Selecciona una de las prácticas"
                defaultValue=""
              >
                {practicas.map((option) => (
                  <MenuItem key={option.label} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Calendario dayName={selected?.dia || ''} />

              <div id="boton-confirmar">
                <CustomButton text="Confirmar"></CustomButton>
              </div>
            </Box>
          </AccordionDetails>
        </div>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Reactivos</Typography>
        </AccordionSummary>
        <div className="centerComboBox">
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Reactivos</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Medida</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.carbs}</TableCell>
                      <TableCell align="center">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br></br>
            <br></br>
            <div id="boton-confirmar">
              <CustomButton text="Confirmar"></CustomButton>
            </div>
          </AccordionDetails>
        </div>
      </Accordion>
    </Box>
  );

  return content;
};
