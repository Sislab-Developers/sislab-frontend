import axios from "axios";
import { useRef, useState } from "react";
import { storeToken } from "../utils/authServices";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/hooks/useLoading";

import { LoginForm } from "../components";

export const Login = () => {
  const { run } = useLoading();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const correoRef = useRef("");
  const passwordRef = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { value: correo } = correoRef.current;
    const { value: password } = passwordRef.current;

    await axios
      .post("https://sf-rest-server.vercel.app/api/maestros/auth/login", {
        correo,
        password,
      })
      .then((response) => {
        storeToken(response.data.token);
        run();
        setTimeout(() => {
          navigate("/nueva-solicitud");
        }, 1000);
      })
      .catch((err) => {
        console.log(err.response.data);
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
    />
  );
};
