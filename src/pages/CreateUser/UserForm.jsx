import { Controller, useForm } from "react-hook-form";

import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postUser } from "../../api/fetch";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ModalContext from "../../context/Modal/ModalContext";

export const UserForm = ({ userId }) => {
  return <Form />;
};

const Form = () => {
  const { updateContent } = useContext(ModalContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationKey: ["create-user"],
    mutationFn: (userData) => postUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      navigate("/admin/usuarios");
    },
    onError: (error) => {
      console.log(error);

      const { errors } = error;
      updateContent({
        title: "Error al crear el usuario",
        content: (
          <>
            {errors.map((err) => (
              <Typography color="error" key={err.msg}>
                {err.msg}
              </Typography>
            ))}
          </>
        ),
      });
    },
  });
  const { control, handleSubmit } = useForm();

  const onSubmitUser = (data) => {
    console.log(data);
    toast.promise(mutateAsync(data), {
      loading: "Creando usuario...",
      success: "Usuario creado exitosamente.",
      error: "Ocurrió un error al crear el usuario.",
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitUser)}
      sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
    >
      <Controller
        name="user-name"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            required
            label="Nombre"
            placeholder="Escribe el nombre del usuario"
            type="text"
          />
        )}
      />
      <Controller
        name="user-surname"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            required
            label="Apellido paterno"
            placeholder="Escribe el apellido paterno del usuario"
            type="text"
          />
        )}
      />
      <Controller
        name="user-surname-2"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            required
            label="Apellido materno"
            placeholder="Escribe el apellido materno del usuario"
            type="text"
          />
        )}
      />
      <Controller
        name="user-email"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            required
            label="Correo electrónico"
            placeholder="Escribe el correo electrónico del usuario"
            type="email"
          />
        )}
      />
      <Controller
        name="user-role"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            required
            select
            label="Rol de usuario"
            placeholder="Selecciona el rol del usuario"
            type="text"
          >
            <MenuItem value="MAESTRO">Maestro</MenuItem>
            <MenuItem value="ADMIN">Técnico</MenuItem>
          </TextField>
        )}
      />
      <Button type="submit" variant="contained" sx={{ mx: { sm: "auto" } }}>
        Crear usuario
      </Button>
    </Box>
  );
};
