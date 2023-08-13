import { Dialog, DialogContent, Typography } from "@mui/material";
import { PDFTicket } from "./PDFTicket";

export const PDFModal = ({ isOpen, onClose, requests, date }) => {
  const transformedData = requests.reduce((acc, request) => {
    const {
      assignmentId: { _id, ...assignmentFields },
      profId: { _id: profId, ...profFields },
      ...rest
    } = request;

    if (!acc[_id]) {
      acc[_id] = {
        assignment: { _id, ...assignmentFields },
        professors: {
          [profId]: {
            professor: { _id: profId, ...profFields },
            requests: [rest],
          },
        },
      };
    } else if (!acc[_id].professors[profId]) {
      acc[_id].professors[profId] = {
        professor: { _id: profId, ...profFields },
        requests: [rest],
      };
    } else {
      acc[_id].professors[profId].requests.push(rest);
    }

    return acc;
  }, {});

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{ sx: { width: { sm: "90%" }, height: { sm: "90%" } } }}
    >
      <DialogContent
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {!requests && (
          <Typography>No hay solicitudes pendientes para esta fecha</Typography>
        )}
        {!!requests && (
          <PDFTicket requests={transformedData} requestsDate={date} />
        )}
      </DialogContent>
    </Dialog>
  );
};
