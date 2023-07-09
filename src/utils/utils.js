export const currentSemester = `${new Date().getFullYear()}-${
  new Date().getMonth() <= 5 ? "1" : "2"
}`;

export const dayMap = {
  Domingo: 0,
  Lunes: 1,
  Martes: 2,
  Miércoles: 3,
  Jueves: 4,
  Viernes: 5,
  Sábado: 6,
};
