import {
  TableContainer,
  Table as MUITable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  useTheme,
} from "@mui/material";

export const Table = ({
  headTitles = ["Reactivos", "Cantidad", "Medida"],
  children,
}) => {
  const theme = useTheme();

  return (
    <TableContainer
      sx={{
        borderRadius: "16px 16px 0 0",
        my: { xs: "0.5rem" },
      }}
    >
      <MUITable>
        <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
          <TableRow>
            {headTitles.map((title, index) => (
              <TableCell
                key={title}
                align={index > 0 ? "right" : "inherit"}
                sx={{ color: "white", fontWeight: "bold" }}
              >
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </MUITable>
    </TableContainer>
  );
};
