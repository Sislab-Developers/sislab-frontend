import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { deleteUser } from "../../api/fetch";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { formatProfName } from "../../utils";
import { useUser } from "@clerk/clerk-react";

export const DeleteUserDialog = ({ user, isOpen, onClose }) => {
  const { user: clerkUser } = useUser();
  const { control, watch, handleSubmit, reset } = useForm({
    defaultValues: {
      "user-name": "",
    },
  });

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: (data) => deleteUser(data.id, { ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      reset();
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
      reset();
    },
  });

  const handleDeleteUser = () => {
    toast.promise(mutateAsync({ id: user._id, userId: clerkUser.id }), {
      loading: "Eliminando usuario",
      success: "Usuario eliminado exitosamente.",
      error: "Ocurrió un error al eliminar al usuario.",
    });
  };

  const userName = formatProfName(user.name, user.surname);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent sx={{ width: { xs: "85vw", sm: "300px" } }}>
        <DialogTitle>Eliminar usuario</DialogTitle>
        <Box
          component="form"
          onSubmit={handleSubmit(handleDeleteUser)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Typography>
            Para confirmar esta acción, escribe el nombre completo del usuario:{" "}
            <Typography color="error" fontWeight="bold">
              {userName}
            </Typography>
          </Typography>
          <Controller
            name="user-name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre"
                color="error"
                placeholder={userName}
              />
            )}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "0.5rem",
              width: "100%",
            }}
          >
            <Button variant="contained" color="primary" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="outlined"
              type="submit"
              color="error"
              disabled={userName !== watch("user-name")}
            >
              Eliminar
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
