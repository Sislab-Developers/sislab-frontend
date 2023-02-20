
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { storeToken } from "../utils/authServices";
import { useNavigate } from "react-router-dom";
import { useLoading, useAuth } from "../context/hooks";
import { LoginForm } from "../components";
import { useLocalStorage } from "../hooks/useLocalStorage";
import AuthContext from "../context/AuthContext";

export const Login = () => {
  const API_URL = 'https://sislab-backend.vercel.app';
  // const API_URL = "http://localhost:8080";

  // const { login } = useAuth();
  const authCtx = useContext(AuthContext);


  const { run: startLoading, stop: stopLoading } = useLoading();

  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const correoRef = useRef("");
  const passwordRef = useRef("");
  const checkRef = useRef();


  // const [isChecked, setIsChecked] = useLocalStorage('xtoken', false);

  const handleSubmit = async (correo, password) => {
    await axios
      .post(`${API_URL}/api/auth/login/`, {
        correo,
        password,
      })
      .then((response) => {

        console.log(response.data);
        const { token, expiresIn } = response.data;
        const expirationDate = new Date(
          new Date().getTime() + +expiresIn * 1000
        );
        authCtx.login(token, expirationDate, keepLoggedIn);

        startLoading();

        setTimeout(() => {
          stopLoading();
          navigate("/nueva-solicitud");
        }, 1500);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
        //setErrorMessage(err.response);
      });
  };

  return (
    <LoginForm
      correoRef={correoRef}
      passwordRef={passwordRef}
      loginHandler={handleSubmit}
      error={error}
      errorMessage={errorMessage}
      checkRef={checkRef}
      setIsChecked={setKeepLoggedIn}
    />
  );
};
