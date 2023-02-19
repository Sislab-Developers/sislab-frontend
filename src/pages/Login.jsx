import axios from "axios";
import { useRef, useState } from "react";
import { storeToken } from "../utils/authServices";
import { useNavigate } from "react-router-dom";
import { useLoading, useAuth } from "../context/hooks";
import { LoginForm } from "../components";
//import { useLocalStorage } from "../hooks/useLocalStorage";

export const Login = () => {
  const API_URL = "https://sislab-backend.vercel.app";

  const { login } = useAuth();

  const { run } = useLoading();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const correoRef = useRef("");
  const passwordRef = useRef("");
  const checkRef = useRef(false);

  //const [isChecked, setIsChecked] = useLocalStorage("userlogged", false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { value: correo } = correoRef.current;
    const { value: password } = passwordRef.current;

    await axios
      .post(`${API_URL}/api/auth/login/`, {
        correo,
        password,
      })
      .then((response) => {
        storeToken(response.data.token);
        login();
        run();
        setTimeout(() => {
          navigate("/nueva-solicitud");
        }, 1500);
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.response.data.msg);
      });
  };

  return (
    <LoginForm
      correoRef={correoRef}
      passwordRef={passwordRef}
      handleSubmit={handleSubmit}
      error={error}
      errorMessage={errorMessage}
      checkRef={checkRef}
      // setIsChecked={setIsChecked}
    />
  );
};
