import { Box, TableCell, TableRow } from "@mui/material";

import { Table } from "../Table/Table";

import { UserItem } from "./UserItem";
import { useUser } from "@clerk/clerk-react";

export const UsersTable = ({ users }) => {
  const { user } = useUser();

  // eslint-disable-next-line no-unused-vars
  users.sort((a, _) => {
    if (a._id === user.id) return -1;

    return 1;
  });

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Table
          tableHead={
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          }
        >
          {users.length === 0 && (
            <TableRow>
              <TableCell colSpan={4}>No hay usuarios registrados.</TableCell>
            </TableRow>
          )}
          {users.map((userRecord) => (
            <UserItem key={userRecord._id} userRecord={userRecord} />
          ))}
        </Table>
      </Box>
    </>
  );
};
