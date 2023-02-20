import { useRef, useState } from 'react';
import { storeToken } from '../utils/authServices';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../context/hooks';
import { LoginForm } from '../components';
import instance from '../utils/axiosConfig';

export const Login = () => {
  const { run } = useLoading();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const correoRef = useRef('');
  const passwordRef = useRef('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { value: correo } = correoRef.current;
    const { value: password } = passwordRef.current;

    await instance
      .post(`/auth/login/`, {
        correo,
        password,
      })
      .then((response) => {
        storeToken(response.token);
        run();
        setTimeout(() => {
          navigate('/nueva-solicitud');
        }, 1500);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
        setErrorMessage(err.msg);
      });
  };

  return (
    <LoginForm
      correoRef={correoRef}
      passwordRef={passwordRef}
      handleSubmit={handleSubmit}
      error={error}
      errorMessage={errorMessage}
    />
  );
};
