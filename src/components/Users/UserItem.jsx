import { Box, IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import { formatProfName } from "../../utils";
import { DeleteForever, Edit } from "@mui/icons-material";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { UpdateUserDialog } from "./UpdateUserDialog";
import { DeleteUserDialog } from "./DeleteUserDialog";

export const UserItem = ({ userRecord }) => {
  const { user } = useUser();

  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const openUpdateModal = () => setUpdateOpen(true);

  const closeUpdateModal = () => setUpdateOpen(false);

  const openDeleteModal = () => setDeleteOpen(true);

  const closeDeleteModal = () => setDeleteOpen(false);

  const shouldDisableActions = user.id === userRecord._id;

  return (
    <>
      <TableRow key={userRecord._id}>
        <TableCell>
          {formatProfName(userRecord.name, userRecord.surname)}
        </TableCell>
        <TableCell>{userRecord.role.name}</TableCell>
        <TableCell>{userRecord.status ? "Activo" : "Inactivo"}</TableCell>
        <TableCell align="right">
          <Tooltip
            title={
              shouldDisableActions && "No puedes modificar tu propio usuario"
            }
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "end",
                gap: "0.25rem",
              }}
            >
              <Tooltip title="Editar usuario">
                <span>
                  <IconButton
                    disabled={shouldDisableActions}
                    onClick={openUpdateModal}
                  >
                    <Edit
                      color={shouldDisableActions ? "disabled" : "primary"}
                    />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Eliminar usuario">
                <span>
                  <IconButton
                    disabled={shouldDisableActions}
                    onClick={openDeleteModal}
                  >
                    <DeleteForever
                      color={shouldDisableActions ? "disabled" : "error"}
                    />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          </Tooltip>
        </TableCell>
      </TableRow>
      <UpdateUserDialog
        user={userRecord}
        isOpen={updateOpen}
        onClose={closeUpdateModal}
      />
      <DeleteUserDialog
        user={userRecord}
        isOpen={deleteOpen}
        onClose={closeDeleteModal}
      />
    </>
  );
};
