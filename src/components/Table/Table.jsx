import {
  TableContainer,
  Table as MUITable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

export const Table = ({ headTitles, children }) => {
  return (
    <TableContainer>
      <MUITable>
        <TableHead>
          <TableRow>
            {headTitles.map((title, index) => (
              <TableCell key={title} align={index > 0 ? "right" : "inherit"}>
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
