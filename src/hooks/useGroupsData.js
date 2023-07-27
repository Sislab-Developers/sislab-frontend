import { useCallback, useContext, useEffect, useState } from "react";

import { useUser } from "@clerk/clerk-react";

import ModalContext from "../context/Modal/ModalContext";

import { getGroupsByPeriod, getGrupos } from "../api/fetch";

import { currentSemester } from "../utils";

export const useGroupsData = () => {
  const [groups, setGroups] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { updateContent } = useContext(ModalContext);
  const { user } = useUser();

  const fetchGroups = useCallback(async () => {
    setIsLoading(true);
    try {
      const groupsRes = await getGrupos(user.id);
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
  }, [user, updateContent]);

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
  const { user } = useUser();

  const fetchGroups = useCallback(async () => {
    setIsLoading(true);
    try {
      const groupsRes = await getGroupsByPeriod(user.id, period);
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
  }, [user, period, updateContent]);

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
