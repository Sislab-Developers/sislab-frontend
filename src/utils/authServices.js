import jwt_decode from 'jwt-decode';

export const storeToken = (token) => {
  localStorage.setItem('x-token', token);
};

export const getToken = (decode = false) => {
  const token = localStorage.getItem('x-token');
  if (decode) {
    const decoded = jwt_decode(token);
    return decoded;
  }
  return token;
};

export const removeToken = () => {
  localStorage.removeItem('x-token');
};
