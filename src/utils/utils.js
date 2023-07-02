export const currentSemester = `${new Date().getFullYear()}-${
  new Date().getMonth() <= 5 ? "1" : "2"
}`;
