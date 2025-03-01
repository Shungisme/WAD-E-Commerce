import {
  Box,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  useTheme,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

type CategoryTableHeadProps = {
  orderBy: string;
  rowCount: number;
  numSelected: number;
  order: "asc" | "desc";
  onSort: (id: string) => void;
  headLabel: Record<string, any>[];
  onSelectAllRows: (checked: boolean) => void;
};

export function CategoryTableHead({
  orderBy,
  rowCount,
  numSelected,
  order,
  onSort,
  headLabel,
  onSelectAllRows,
}: CategoryTableHeadProps) {
  const theme = useTheme();

  return (
    <TableHead>
      <TableRow>
        <TableCell
          padding="checkbox"
          sx={{
            bgcolor:
              theme.palette.mode === "light"
                ? theme.palette.background.neutral
                : theme.palette.background.paper,
          }}
        >
          <Checkbox
            indeterminate={rowCount > 0 && numSelected === rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onSelectAllRows(event.target.checked);
            }}
          />
        </TableCell>

        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || "left"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              width: headCell.width,
              minWidth: headCell.minWidth,
              bgcolor:
                theme.palette.mode === "light"
                  ? theme.palette.background.neutral
                  : theme.palette.background.paper,
            }}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={() => onSort(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box
                  sx={{
                    ...visuallyHidden,
                  }}
                >
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
