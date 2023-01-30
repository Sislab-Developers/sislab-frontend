import jwt_decode from "jwt-decode";

export const storeToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = (decode = false) => {
  const token = localStorage.getItem("token");
  if (decode) {
    const decoded = jwt_decode(token);
    return decoded;
  }
  return token;
};

export const logout = () => {
  localStorage.removeItem("token");
};
