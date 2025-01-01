import { TableCell, TableRow, TableRowProps } from "@mui/material";

type TableEmptyRowsProps = TableRowProps & {
  emptyRows: number;
  height: number;
};

export function TableEmptyRows({
  emptyRows,
  height,
  sx,
  ...other
}: TableEmptyRowsProps) {
  if (!emptyRows) return null;

  return (
    <TableRow
      sx={{
        ...(height && {
          height: height * emptyRows,
        }),
        ...sx,
      }}
      {...other}
    >
      <TableCell colSpan={9} />
    </TableRow>
  );
}
