import { Box, CircularProgress, TextField } from "@mui/material";
import { UsersTable } from "./UsersTable";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/fetch";
import { ErrorMessage } from "../ErrorMessage";
import { toast } from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { formatProfName } from "../../utils";

export const Users = () => {
  const { control, watch } = useForm();

  const usersQuery = useQuery({ queryKey: ["users"], queryFn: getUsers });

  if (usersQuery.isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (usersQuery.isError) {
    toast.error("Ocurrió un error al obtener a los usuarios.");
    return (
      <ErrorMessage>Ocurrió un error al obtener a los usuarios.</ErrorMessage>
    );
  }

  const filteredUsers = usersQuery.data.usuarios.filter((user) => {
    const userFilter = watch("user-filter");

    if (!userFilter) return true;

    const userFullName = formatProfName(user.name, user.surname);

    return userFullName.toLowerCase().includes(userFilter.toLowerCase());
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          gap: "0.5rem",
        }}
      >
        <Controller
          name="user-filter"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              placeholder="Nombre del usuario"
              label="Buscar usuario"
            />
          )}
        />
      </Box>
      <UsersTable users={filteredUsers} />
    </Box>
  );
};
