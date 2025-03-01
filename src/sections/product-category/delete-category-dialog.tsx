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
import { CategoryProps } from "./category-table-row";

export type DeleteCategoryDialogProps = {
  open: boolean;
  onClose: () => void;
  onDelete: (category: CategoryProps) => void;
  category: CategoryProps;
};

export default function DeleteCategoryDialog({
  open,
  onClose,
  onDelete,
  category,
}: DeleteCategoryDialogProps) {
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
          Delete Category
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ pt: 2 }}>
          <Typography>
            Are you sure you want to delete this category? This action cannot be
            undone.
          </Typography>

          <Box
            sx={{
              p: 2.5,
              borderRadius: 1,
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
            }}
          >
            <Box>
              <Typography variant="subtitle2">{category.title}</Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {category.status}
              </Typography>
            </Box>
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
          onClick={() => onDelete(category)}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
