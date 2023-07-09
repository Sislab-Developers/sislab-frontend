import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { currentSemester, getToken } from "../utils";
import { getGroupsByPeriod, getGrupos } from "../api/fetch";

export const useGroupsData = () => {
  const [groups, setGroups] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  const { uid } = getToken(authCtx.token, true);

  const fetchGroups = useCallback(async () => {
    setIsLoading(true);
    try {
      const groupsRes = await getGrupos(uid);
      setGroups([...groupsRes.grupos]);
      setTotal(groupsRes.grupos.length);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return {
    groups,
    total,
    isLoading,
    fetchGroups,
  };
};

export const useGroupsByPeriodData = (period = currentSemester) => {
  const [groups, setGroups] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  const { uid } = getToken(authCtx.token, true);

  const fetchGroups = useCallback(async () => {
    setIsLoading(true);
    try {
      const groupsRes = await getGroupsByPeriod(uid, period);
      setGroups([...groupsRes.grupos]);
      setTotal(groupsRes.grupos.length);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [uid, period]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return {
    groups,
    total,
    isLoading,
    fetchGroups,
  };
};
