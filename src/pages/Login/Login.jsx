import instance from '../../utils/axiosConfig';
import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../context/hooks';
import AuthContext from '../../context/AuthContext.jsx';
import { LoginForm } from '../../components';

export const Login = () => {
  const authCtx = useContext(AuthContext);

  const { run: startLoading, stop: stopLoading } = useLoading();

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
      .post('auth/login/', {
        correo,
        password,
      })
      .then((response) => {
        const { accessToken, refreshToken, expiresIn, usuario } = response;

        const expirationDate = new Date(
          new Date().getTime() + expiresIn * 1000
        );

        authCtx.login(
          accessToken,
          refreshToken,
          expirationDate,
          false,
          usuario
        );
        startLoading();

        setTimeout(() => {
          stopLoading();
          navigate(
            usuario.rol === 'MAESTRO'
              ? '/nueva-solicitud'
              : '/admin/solicitudes'
          );
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
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
