import instance from "../utils/axiosConfig";

export const getGrupos = async (uid) => {
  const response = await instance.get(`grupos/professor/${uid}`);
  return response;
};

export const getGroupsByPeriod = async (uid, period) => {
  const response = await instance.get("grupos/period", {
    params: { profId: uid, period },
  });
  return response;
};

export const getLaboratorios = async () => {
  const response = await instance.get(`laboratorios/`);
  return response;
};

export const getAssignments = async () => {
  return await instance.get("practicas");
};

export const getCarreras = async () => {
  const response = await instance.get(`carreras/`);
  return response;
};

export const getMaterias = async () => {
  const response = await instance.get(`materias/`);
  return response;
};

export const getDias = async () => {
  const response = await instance.get(`dias/`);
  return response;
};

export const getHoras = async () => {
  const response = await instance.get(`horas/`);
  return response;
};

export const getRequests = async () => {
  return await instance.get("solicitudes");
};

export const getRequestsByProf = async (uid) => {
  return await instance.get("solicitudes/by-prof", {
    params: { profId: uid },
  });
};

export const getRequestsByProfAndDate = async (uid, date) => {
  return await instance.get("solicitudes/by-prof-and-date", {
    params: {
      profId: uid,
      date: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ).getTime(),
    },
  });
};

export const getRequestsByDate = async (date) => {
  return await instance.get("solicitudes/by-date", {
    params: {
      date: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ).getTime(),
    },
  });
};

export const postRequest = async (data) => {
  return await instance.post("solicitudes", data);
};
