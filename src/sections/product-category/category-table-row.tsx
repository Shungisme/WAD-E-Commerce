import {
  Checkbox,
  IconButton,
  MenuItem,
  menuItemClasses,
  MenuList,
  Popover,
  TableCell,
  TableRow,
} from "@mui/material";
import { useCallback, useState } from "react";
import { Label } from "../../components/label/label";
import { Iconify } from "../../components/iconify/iconify";
import { formatDateTime } from "../../utils/format-time";
import EditCategoryDialog from "./edit-category-dialog";
import DeleteCategoryDialog from "./delete-category-dialog";

export type CategoryProps = {
  id: string;
  title: string;
  parentSlug: string;
  description: string;
  status: string;
  slug: string;
  timestamps: string;
};

export type CategoryTableRowProps = {
  row: CategoryProps;
  selected: boolean;
  onSelectRow: () => void;
  onEditRow: (category: CategoryProps) => void;
  onDeleteRow: (category: CategoryProps) => void;
};

export function CategoryTableRow({
  row,
  selected,
  onSelectRow,
  onEditRow,
  onDeleteRow,
}: CategoryTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
    null
  );

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpenPopover(event.currentTarget);
    },
    []
  );

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>

        <TableCell>{row.parentSlug}</TableCell>

        <TableCell>
          <Label color={row.status === "active" ? "success" : "error"}>
            {row.status}
          </Label>
        </TableCell>

        <TableCell>{formatDateTime(row.timestamps)}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: "flex",
            flexDirection: "column",
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: {
                bgcolor: "action.selected",
              },
            },
          }}
        >
          <MenuItem onClick={() => setOpenEditDialog(true)}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem
            onClick={() => setOpenDeleteDialog(true)}
            sx={{ color: "error.main" }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>

      <EditCategoryDialog
        open={openEditDialog}
        onClose={() => {
          setOpenEditDialog(false);
          handleClosePopover();
        }}
        category={row}
        onSave={onEditRow}
      />

      <DeleteCategoryDialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
          handleClosePopover();
        }}
        onDelete={onDeleteRow}
        category={row}
      />
    </>
  );
}
