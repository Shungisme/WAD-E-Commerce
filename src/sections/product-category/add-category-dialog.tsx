import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Avatar,
  IconButton,
  Typography,
  FormGroup,
  FormHelperText,
} from "@mui/material";
import { Iconify } from "../../components/iconify/iconify";
import { alpha } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { CategoryProps } from "./category-table-row";

export type AddCategoryDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (category: Partial<CategoryProps>) => void;
};

const validationSchema = new Yup.ObjectSchema({
  title: Yup.string()
    .required("Title is required")
    .min(6, "Title must be at least 6 characters")
    .max(255, "Title must be at most 255 characters"),
  parentSlug: Yup.string().required("Parent Slug is required"),
  description: Yup.string()
    .min(6, "Description must be at least 6 characters")
    .max(255, "Description must be at most 255 characters")
    .required("Description is required"),
  status: Yup.string()
    .oneOf(["active", "inactive"], "Invalid status")
    .required("Status is required"),
});

export default function AddAccountDialog({
  open,
  onClose,
  onCreate,
}: AddCategoryDialogProps) {
  const formik = useFormik({
    initialValues: {
      title: "",
      parentSlug: "",
      description: "",
      status: "active",
    },
    validationSchema: validationSchema,
    onSubmit: async (value: Partial<CategoryProps>) => {
      onCreate(value);
      onClose();
    },
  });

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
            bgcolor: (theme) => alpha(theme.palette.success.main, 0.08),
          }}
        >
          <Iconify
            icon="ic:outline-drive-file-rename-outline"
            sx={{
              color: "success.main",
              width: 24,
              height: 24,
            }}
          />
        </Box>
        <Typography
          sx={{
            fontSize: (theme) => theme.typography.h6,
          }}
        >
          Add Category
        </Typography>
      </DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <DialogContent>
            <Box
              sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 3 }}
            >
              <FormControl
                fullWidth
                required
                error={!!formik.errors.title && formik.touched.title}
              >
                <TextField
                  name="title"
                  fullWidth
                  label="Title"
                  autoComplete="title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.title && formik.touched.title && (
                  <FormHelperText>{formik.errors.title}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                required
                error={!!formik.errors.parentSlug && formik.touched.parentSlug}
              >
                <TextField
                  name="parentSlug"
                  fullWidth
                  label="Parent Slug"
                  type="parentSlug"
                  autoComplete="parentSlug"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.parentSlug && formik.touched.parentSlug && (
                  <FormHelperText>{formik.errors.parentSlug}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={!!formik.errors.status && formik.touched.status}
              >
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formik.values.status}
                  label="Status"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{
                    color:
                      formik.values.status === "active"
                        ? "success.light"
                        : "error.light",
                  }}
                  startAdornment={
                    <>
                      <Iconify
                        icon={
                          formik.values.status === "active"
                            ? "nrk:checkbox-active"
                            : "mdi:close-box"
                        }
                      />
                      &nbsp;
                    </>
                  }
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>

                {formik.errors.status && formik.touched.status && (
                  <FormHelperText>{formik.errors.status}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={
                  !!formik.errors.description && formik.touched.description
                }
              >
                <TextField
                  name="description"
                  label="Description"
                  value={formik.values.description}
                  multiline
                  minRows={3}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormControl>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Create Category
            </Button>
          </DialogActions>
        </FormGroup>
      </form>
    </Dialog>
  );
}
