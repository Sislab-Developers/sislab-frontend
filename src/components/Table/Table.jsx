import {
  TableContainer,
  Table as MUITable,
  TableHead,
  TableBody,
  useTheme,
} from "@mui/material";

export const Table = ({ tableHead, children }) => {
  const theme = useTheme();

  return (
    <TableContainer
      sx={{
        borderRadius: "16px 16px 0 0",
        my: { xs: "0.5rem" },
      }}
    >
      <MUITable>
        <TableHead
          sx={{
            backgroundColor: theme.palette.primary.main,
            "& > tr > th": { color: "white", fontWeight: "bold" },
          }}
        >
          {tableHead}
        </TableHead>
        <TableBody>{children}</TableBody>
      </MUITable>
    </TableContainer>
  );
};
