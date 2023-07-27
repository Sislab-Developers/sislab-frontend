import { createContext } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAuth, useUser } from "@clerk/clerk-react";

import { getLoggedUser, postUser } from "../api/fetch";

const AuthContext = createContext({
  user: {
    role: {
      name: null,
    },
    createdAt: null,
    updatedAt: null,
    status: false,
  },
  isQueryLoading: false,
  isQueryFetching: false,
  isQueryError: false,
  queryError: null,
  isMutationLoading: false,
  isMutationError: false,
  mutationError: null,
  refetch: () => {},
});

export const AuthContextProvider = (props) => {
  const { userId } = useAuth();
  const { user } = useUser();

  const queryClient = useQueryClient();
  const {
    isError: isQueryError,
    isLoading: isQueryLoading,
    isFetching: isQueryFetching,
    data,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ["logged-user-data"],
    queryFn: () => getLoggedUser(userId),
    retry: false,
  });
  const {
    isLoading: isMutationLoading,
    isError: isMutationError,
    error: mutationError,
    mutate,
  } = useMutation({
    mutationKey: ["logged-user-data", "post"],
    mutationFn: () =>
      postUser({ userId, name: user.firstName, surname: user.lastName }),
    onSuccess: () => queryClient.invalidateQueries("logged-user-data"),
    retry: false,
  });

  if (!isQueryFetching && !isMutationLoading && (queryError || !data)) {
    mutate();
  }

  const contextValue = {
    user: data?.user,
    isQueryError,
    isQueryLoading,
    isQueryFetching,
    queryError,
    isMutationLoading,
    isMutationError,
    mutationError,
    refetch,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
