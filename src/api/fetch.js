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

export const getUsers = async () => {
  const response = await instance.get(`usuarios/`);
  return response;
};

export const getRequests = async () => {
  return await instance.get("solicitudes");
};

export const getRoles = async () => {
  return await instance.get("roles");
};

export const getPendingRequests = async () => {
  return await instance.get("solicitudes/pending");
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

/**
 * Creates the user on the database.
 * @param {{userId: string, name: string, surname: string}} data
 * @returns A promise with the API response, which can be either the user's data, status messages or error messages.
 */
export const createUser = async (data) => {
  return await instance.post("usuarios", { ...data });
};

/**
 * Updates the user's role on the database.
 * @param {{userId: string, role: string, status: boolean}} data The body of the request.
 * @returns A promise with the API response, which can be either the user's data, status messages or error messages.
 */
export const updateUser = async (data) => {
  return await instance.put("usuarios/update-role", { ...data });
};

/**
 * Deletes the user from the database.
 * @param {string} uid The user-to-delete's ID.
 * @param {{ userId: string }} data The body of the request, containing the logged user's ID.
 * @returns A promise with the API response, indicating whether the operation was successful or not.
 */
export const deleteUser = async (uid, data) => {
  return await instance.delete(`usuarios/${uid}`, { data: { ...data } });
};

/**
 * Gets the user's data from the API.
 * @param {string} uid
 * @returns A promise with the API response, which can be either the user's data or error messages.
 */
export const getLoggedUser = async (uid) => {
  return await instance.get(`usuarios/${uid}`);
};
