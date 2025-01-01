import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
  Stack,
  alpha,
} from "@mui/material";
import { Iconify } from "../../components/iconify/iconify";
import { AccountProps } from "./account-table-row";

export type DeleteAccountDialogProps = {
  open: boolean;
  onClose: () => void;
  onDelete: (account: AccountProps) => void;
  account: AccountProps;
};

export default function DeleteAccountDialog({
  open,
  onClose,
  onDelete,
  account,
}: DeleteAccountDialogProps) {
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
          Delete Account
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ pt: 2 }}>
          <Typography>
            Are you sure you want to delete this account? This action cannot be
            undone.
          </Typography>

          <Box
            sx={{
              p: 2.5,
              borderRadius: 1,
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                src={account.avatar}
                alt={account.name}
                sx={{ width: 48, height: 48 }}
              />
              <Box>
                <Typography variant="subtitle2">{account.name}</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {account.email}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => onDelete(account)}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
