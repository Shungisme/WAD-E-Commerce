import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Stack,
  alpha,
} from "@mui/material";
import { Iconify } from "../../components/iconify/iconify";

export type DeleteAccountsDialogProps = {
  open: boolean;
  onClose: () => void;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
  numAccount: number;
};

export default function DeleteAccountsDialog({
  open,
  onClose,
  onDelete,
  numAccount,
}: DeleteAccountsDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", gap: 2, pb: 0 }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
          }}
        >
          <Iconify
            icon="eva:trash-2-outline"
            sx={{
              color: "error.main",
              width: 24,
              height: 24,
            }}
          />
        </Box>
        <Typography sx={{ fontSize: (theme) => theme.typography.h6 }}>
          Delete Accounts
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ pt: 2 }}>
          <Typography>
            Are you sure you want to delete {numAccount} accounts? This action
            cannot be undone.
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onDelete}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
