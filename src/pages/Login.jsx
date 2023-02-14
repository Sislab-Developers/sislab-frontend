import axios from "axios";
import { useRef, useState } from "react";
import { storeToken, getToken } from "../utils/authServices";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/hooks/useLoading";
import { LoginForm } from "../components";

export const Login = () => {
  const API_URL = "https://sislab-backend.vercel.app";

  const { run, stop } = useLoading();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const correoRef = useRef("");
  const passwordRef = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { value: correo } = correoRef.current;
    const { value: password } = passwordRef.current;

    try {
      run();
      const response = await axios
        .post(`${API_URL}/api/auth/login/`, {
          correo,
          password,
        });
      await storeToken(response.data.token); 
      navigate("/nueva-solicitud");
      stop();
    } catch (err) {
      stop();
      console.log(err.response.data);
      setError(true);
      setErrorMessage(err.response.data.msg);
    }
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
