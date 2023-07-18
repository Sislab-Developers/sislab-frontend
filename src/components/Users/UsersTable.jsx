import { Box, IconButton, TableCell, TableRow } from "@mui/material";
import { Edit } from "@mui/icons-material";

import { Table } from "../Table/Table";

import { formatProfName } from "../../utils";

export const UsersTable = ({ users }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Table
        headTitles={["Nombre", "Rol", "Editar"]}
        tableHead={
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell align="right">Editar</TableCell>
          </TableRow>
        }
      >
        {users.length === 0 && (
          <TableRow>
            <TableCell colSpan={3}>No hay usuarios registrados.</TableCell>
          </TableRow>
        )}
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell>
              {formatProfName(
                user.nombre,
                user.apellidoPaterno,
                user.apellidoMaterno
              )}
            </TableCell>
            <TableCell>{user.rol}</TableCell>
            <TableCell align="right">
              <IconButton>
                <Edit color="primary" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </Box>
  );
};
