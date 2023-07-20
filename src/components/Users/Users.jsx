import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { UsersTable } from "./UsersTable";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/fetch";
import { ErrorMessage } from "../ErrorMessage";
import { toast } from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { formatProfName } from "../../utils";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const navigate = useNavigate();
  const { control, watch } = useForm();

  const usersQuery = useQuery({ queryKey: ["users"], queryFn: getUsers });

  const handleCreateUser = () => {
    navigate("/admin/crear-usuario");
  };

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

    const userFullName = formatProfName(
      user.nombre,
      user.apellidoPaterno,
      user.apellidoMaterno
    );

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
        <Button
          variant="contained"
          onClick={handleCreateUser}
          sx={{ flexShrink: 0 }}
        >
          Crear usuario
        </Button>
      </Box>
      <UsersTable users={filteredUsers} />
    </Box>
  );
};
