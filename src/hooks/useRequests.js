import { useCallback, useContext, useEffect, useState } from "react";

import AuthContext from "../context/AuthContext";
import { getToken } from "../utils";
import { getRequestsByProf, getRequestsByProfAndDate } from "../api/fetch";

export const useRequestsByProf = () => {
  const [requests, setRequests] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  const { uid } = getToken(authCtx.token, true);

  const fetchRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      const requestsRes = await getRequestsByProf(uid);
      setRequests([...requestsRes.requests]);
      setTotal(requestsRes.requests.length);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [uid]);

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

  const authCtx = useContext(AuthContext);
  const { uid } = getToken(authCtx.token, true);

  const fetchRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      const requestsRes = await getRequestsByProfAndDate(uid, date);
      setRequests([...requestsRes.requests]);
      setTotal(requestsRes.requests.length);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [uid, date]);

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
