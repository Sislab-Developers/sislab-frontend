import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { currentSemester, getToken } from "../utils";
import { getGroupsByPeriod, getGrupos } from "../api/fetch";
import ModalContext from "../context/Modal/ModalContext";

export const useGroupsData = () => {
  const [groups, setGroups] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { updateContent } = useContext(ModalContext);
  const authCtx = useContext(AuthContext);
  const { uid } = getToken(authCtx.token, true);

  const fetchGroups = useCallback(async () => {
    setIsLoading(true);
    try {
      const groupsRes = await getGrupos(uid);
      setGroups([...groupsRes.grupos]);
      setTotal(groupsRes.grupos.length);
    } catch (error) {
      updateContent({
        title: "Error",
        content: `Ocurrió un error al obtener los grupos. Detalles: ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  }, [uid, updateContent]);

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

  const { updateContent } = useContext(ModalContext);
  const authCtx = useContext(AuthContext);
  const { uid } = getToken(authCtx.token, true);

  const fetchGroups = useCallback(async () => {
    setIsLoading(true);
    try {
      const groupsRes = await getGroupsByPeriod(uid, period);
      setGroups([...groupsRes.grupos]);
      setTotal(groupsRes.grupos.length);
    } catch (error) {
      updateContent({
        title: "Error",
        content: `Ocurrió un error al obtener los grupos. Detalles: ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  }, [uid, period, updateContent]);

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
