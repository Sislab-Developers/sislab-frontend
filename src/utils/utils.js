import { format } from "date-fns";
import { es } from "date-fns/locale";

export const currentSemester = `${new Date().getFullYear()}-${
  new Date().getMonth() <= 5 ? "1" : "2"
}`;

export const formatGroupName = (index, day, time) =>
  `G${index} | ${days[day].toUpperCase()} | ${formatTime(time)}`;

export const formatTime = (time) => {
  if (!time) return null;

  return `${time}:00 - ${time + 2}:00`;
};

export const formatAssignment = (assignment) => {
  if (!assignment) return null;

  const { number, name } = assignment;

  return `Práctica ${number}: ${name}`;
};

export const fullDateFormat = (date) => {
  if (!date) return null;

  return format(new Date(date), "dd 'de' MMMM 'del' yyyy", {
    locale: es,
  });
};

export const dayMap = {
  Domingo: 0,
  Lunes: 1,
  Martes: 2,
  Miércoles: 3,
  Jueves: 4,
  Viernes: 5,
  Sábado: 6,
};

export const days = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
