import {
  Avatar,
  Box,
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
import EditAccountDialog from "./edit-account-dialog";
import DeleteAccountDialog from "./delete-account-dialog";

export type AccountProps = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: string;
};

export type AccountTableRowProps = {
  row: AccountProps;
  selected: boolean;
  onSelectRow: () => void;
  onEditRow: (account: AccountProps) => void;
  onDeleteRow: (account: AccountProps) => void;
};

export function AccountTableRow({
  row,
  selected,
  onSelectRow,
  onEditRow,
  onDeleteRow,
}: AccountTableRowProps) {
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
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.name} src={row.avatar} />
            {row.name}
          </Box>
        </TableCell>

        <TableCell>{row.email}</TableCell>

        <TableCell>{sentenceCase(row.role)}</TableCell>

        <TableCell>
          <Label color={row.status === "active" ? "success" : "error"}>
            {row.status}
          </Label>
        </TableCell>

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

      <EditAccountDialog
        open={openEditDialog}
        onClose={() => {
          setOpenEditDialog(false);
          handleClosePopover();
        }}
        account={row}
        onSave={onEditRow}
      />

      <DeleteAccountDialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
          handleClosePopover();
        }}
        onDelete={onDeleteRow}
        account={row}
      />
    </>
  );
}

function sentenceCase(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
