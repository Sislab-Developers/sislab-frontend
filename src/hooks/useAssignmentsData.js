/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";

import { getAssignments } from "../api/fetch";
import ModalContext from "../context/Modal/ModalContext";

export const useAssignmentsData = () => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { updateContent } = useContext(ModalContext);

  const fetchAssignments = async () => {
    setIsLoading(true);
    try {
      const assignmentsRes = await getAssignments();
      setAssignments([...assignmentsRes.assignments]);
    } catch (error) {
      updateContent({
        title: "Error",
        body: `Ocurrió un error al obtener las prácticas. Detalles: ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return {
    assignments,
    isLoading,
    fetchAssignments,
  };
};
