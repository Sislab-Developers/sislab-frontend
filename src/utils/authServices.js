import jwt_decode from "jwt-decode";

// export const storeToken = (token) => {
//   localStorage.setItem("token", token);
// };

export const getToken = (token, decode = false) => {
  const storedToken = token || localStorage.getItem("token");
  if (decode) {
    const decoded = jwt_decode(storedToken);
    return decoded;
  }
  return storedToken;
};

// export const removeToken = () => {
//   localStorage.removeItem("token");
// };
