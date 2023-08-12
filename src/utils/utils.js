import { format } from "date-fns";
import { es } from "date-fns/locale";

/**
 * This constant returns the current period.
 */
export const currentSemester = `${new Date().getFullYear()}-${
  new Date().getMonth() <= 5 ? "1" : "2"
}`;

/**
 * This function formats a professor's name.
 * @param {string} name
 * @param {string} surname
 * @returns {string} Formatted full name.
 */
export const formatProfName = (name, surname) => {
  if (!name || !surname) return null;

  return `${name} ${surname}`;
};

/**
 * This function formats a group's name.
 * @param {number} index
 * @param {number} day
 * @param {number} time
 * @returns {string} Formatted group name.
 */
export const formatGroupName = (index, day, time) =>
  `G${index} | ${days[day].toUpperCase()} | ${formatTimeslot(time)}`;

/**
 * This function formats a group's timeslot.
 * @param {number | undefined} time
 * @returns {string} Formatted time.
 */
export const formatTimeslot = (time) => {
  if (!time) return null;

  return `${time}:00 - ${time + 2}:00`;
};

/**
 * This function formats an assignment's name.
 * @param {{ number: number, name: string }} assignment
 * @returns {string} Formatted assignment name.
 */
export const formatAssignment = (assignment) => {
  if (!assignment) return null;

  const { number, name } = assignment;

  return `Práctica ${number}: ${name}`;
};

/**
 * This function formats a date.
 * @param {number | Date | string | undefined} date
 * @returns {string} A formatted date.
 */
export const fullDateFormat = (date) => {
  if (!date) return null;

  return format(new Date(date), "dd 'de' MMMM 'del' yyyy", {
    locale: es,
  });
};

/**
 * This function formats a date and time.
 * @param {Date | number | string | undefined} date
 * @returns {string} A formatted date and time.
 */
export const fullDateTimeFormat = (date) => {
  if (!date) return null;

  return format(new Date(date), "EEEE dd 'de' MMMM 'del' yyyy 'a las' HH:mm", {
    locale: es,
  });
};

/**
 * This function replaces an HTML entity (subscripts) with unicode.
 * @param {string} text String of text that may have an HTML entity.
 * @returns A new string with unicodes in place of HTML entities.
 */
export const replaceWithUnicode = (text) => {
  return text.replace(/&#[0-9]+;/g, (entity) => {
    const codePoint = parseInt(entity.match(/[0-9]+/));
    return String.fromCodePoint(codePoint);
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
