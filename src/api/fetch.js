import instance from "../utils/axiosConfig";

export const getGrupos = async (uid) => {
  try {
    const response = await instance.get(`grupos/${uid}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getLaboratorios = async () => {
  try {
    const response = await instance.get(`laboratorios/`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAssignments = async () => {
  return await instance.get("practicas");
};

export const getCarreras = async () => {
  try {
    const response = await instance.get(`carreras/`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getMaterias = async () => {
  try {
    const response = await instance.get(`materias/`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getDias = async () => {
  try {
    const response = await instance.get(`dias/`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getHoras = async () => {
  try {
    const response = await instance.get(`horas/`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postRequest = async (data) => {
  const response = await instance.post("solicitudes", data);
  return response;
};
