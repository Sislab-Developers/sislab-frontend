import { useCallback, useEffect, useState } from "react";

import { getAssignments } from "../api/fetch";

export const useAssignmentsData = () => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAssignments = useCallback(async () => {
    setIsLoading(true);
    try {
      const assignmentsRes = await getAssignments();
      setAssignments([...assignmentsRes.assignments]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  return {
    assignments,
    isLoading,
    fetchAssignments,
  };
};
