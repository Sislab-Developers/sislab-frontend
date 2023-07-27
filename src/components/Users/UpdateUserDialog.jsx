import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRoles, updateUser } from "../../api/fetch";
import { ErrorMessage } from "../ErrorMessage";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export const UpdateUserDialog = ({ user, isOpen, onClose }) => {
  const { control, handleSubmit } = useForm();

  const queryClient = useQueryClient();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });
  const { mutateAsync } = useMutation({
    mutationKey: ["update-user"],
    mutationFn: (userData) => updateUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpdateUser = (data) => {
    toast.promise(
      mutateAsync({
        userId: user._id,
        role: data["user-role"],
        status: data["user-status"],
      }),
      {
        loading: "Actualizando usuario",
        success: "Usuario actualizado exitosamente.",
        error: "Ocurrió un error al actualizar al usuario.",
      }
    );
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <CircularProgress />
        <Typography textAlign="center">Obteniendo datos</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Typography textAlign="center">
          Ocurrió un error al obtener los datos.
        </Typography>
        <ErrorMessage textAlign="center">{error.message}</ErrorMessage>
      </Box>
    );
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent sx={{ width: { xs: "85vw", sm: "300px" } }}>
        <DialogTitle>Editar usuario</DialogTitle>
        <Box
          component="form"
          onSubmit={handleSubmit(handleUpdateUser)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Controller
            name="user-role"
            control={control}
            defaultValue={user.role._id}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Rol"
                placeholder={user.role.name || ""}
              >
                {data.roles.map((role) => (
                  <MenuItem key={role._id} value={role._id}>
                    {role.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            name="user-status"
            control={control}
            defaultValue={user.status}
            render={({ field }) => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: "1rem",
                }}
              >
                <Typography variant="body1">Estado</Typography>
                <Switch
                  {...field}
                  defaultChecked={user.status}
                  color="primary"
                />
              </Box>
            )}
          />
          <Button variant="contained" type="submit">
            Actualizar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
