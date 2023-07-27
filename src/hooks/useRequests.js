import { useCallback, useContext, useEffect, useState } from "react";

import { useUser } from "@clerk/clerk-react";

import ModalContext from "../context/Modal/ModalContext";

import { getRequestsByProf, getRequestsByProfAndDate } from "../api/fetch";

export const useRequestsByProf = () => {
  const [requests, setRequests] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { updateContent } = useContext(ModalContext);

  const { user } = useUser();

  const fetchRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      const requestsRes = await getRequestsByProf(user.id);
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
  }, [user, updateContent]);

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

  const { user } = useUser();

  const fetchRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      const requestsRes = await getRequestsByProfAndDate(user.id, date);
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
  }, [user, date, updateContent]);

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
