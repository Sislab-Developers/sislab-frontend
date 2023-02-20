import { useEffect, useRef, useState } from "react";
import { storeToken } from "../utils/authServices";
import { useNavigate } from "react-router-dom";
import { useLoading, useAuth } from "../context/hooks";
import { LoginForm } from "../components";
import instance from "../utils/axiosConfig";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const Login = () => {
  const { login } = useAuth();

  const { run } = useLoading();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const correoRef = useRef("");
  const passwordRef = useRef("");
  const checkRef = useRef();

  const [isChecked, setIsChecked] = useLocalStorage("userlogged", false);

  useEffect(() => {
    setIsChecked(false);
  }, []);

  console.log(isChecked);

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
        if (!isChecked) {
          console.log(response.token);
          storeToken(response.token);
        }
        login();
        run();
        setTimeout(() => {
          navigate("/nueva-solicitud");
        }, 1500);
      })
      .catch((err) => {
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
      checkRef={checkRef}
      setIsChecked={setIsChecked}
    />
  );
};
