import { useCallback, useContext, useEffect, useState } from "react";

import { getToken } from "../utils";
import { getRequestsByProf, getRequestsByProfAndDate } from "../api/fetch";
import AuthContext from "../context/AuthContext";
import ModalContext from "../context/Modal/ModalContext";

export const useRequestsByProf = () => {
  const [requests, setRequests] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { updateContent } = useContext(ModalContext);

  const authCtx = useContext(AuthContext);
  const { uid } = getToken(authCtx.token, true);

  const fetchRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      const requestsRes = await getRequestsByProf(uid);
      setRequests([...requestsRes.requests]);
      setTotal(requestsRes.requests.length);
    } catch (error) {
      updateContent({
        title: "Error",
        content: `Ocurrió un error al obtener las solicitudes. Detalles: ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  }, [uid, updateContent]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    requests,
    total,
    isLoading,
    fetchRequests,
  };
};

export const useRequestsByProfDate = (date) => {
  const [requests, setRequests] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { updateContent } = useContext(ModalContext);

  const authCtx = useContext(AuthContext);
  const { uid } = getToken(authCtx.token, true);

  const fetchRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      const requestsRes = await getRequestsByProfAndDate(uid, date);
      setRequests([...requestsRes.requests]);
      setTotal(requestsRes.requests.length);
    } catch (error) {
      updateContent({
        title: "Error",
        content: `Ocurrió un error al obtener las solicitudes. Detalles: ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  }, [uid, date, updateContent]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    requests,
    total,
    isLoading,
    fetchRequests,
  };
};
