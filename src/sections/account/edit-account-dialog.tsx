import { useState } from "react";
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
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Iconify } from "../../components/iconify/iconify";
import { alpha } from "@mui/material";
import { AccountProps } from "./account-table-row";

export type EditAccountDialogProps = {
  open: boolean;
  onClose: () => void;
  account: AccountProps;
  onSave: (account: AccountProps) => void;
};

const cloudinaryConfig = {
  cloudName: String(process.env.REACT_APP_CLOUDINARY_CLOUD_NAME) || "",
  uploadPreset: String(process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET) || "",
};

const validationSchema = new Yup.ObjectSchema({
  name: Yup.string().required("Name is required"),
  role: Yup.string()
    .oneOf(["admin", "user"], "Invalid role")
    .required("Role is required"),
  status: Yup.string()
    .oneOf(["active", "inactive"], "Invalid status")
    .required("Status is required"),
  avatar: Yup.mixed().required("Avatar is required"),
});

export default function EditAccountDialog({
  open,
  onClose,
  account,
  onSave,
}: EditAccountDialogProps) {
  const formik = useFormik({
    initialValues: {
      ...account,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!values?.avatar) return;

      const formData = new FormData();
      formData.append("file", values?.avatar);
      formData.append("upload_preset", cloudinaryConfig.uploadPreset);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        formData
      );

      const avatar = await response.data;

      onSave({ ...values, avatar: avatar.secure_url });

      onClose();
    },
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        formik.setFieldValue("avatar", e.target?.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

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
          Edit Account
        </Typography>
      </DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src={formik.values.avatar}
                sx={{ width: 80, height: 80 }}
              />
              <FormControl
                error={!!formik.errors.avatar && formik.touched.avatar}
              >
                <IconButton component="label">
                  <input
                    type="file"
                    name="avatar"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  <Iconify icon="solar:camera-add-bold" />
                </IconButton>

                {formik.errors.avatar && formik.touched.avatar && (
                  <FormHelperText>{formik.errors.avatar}</FormHelperText>
                )}
              </FormControl>
            </Box>

            <FormControl
              error={!!formik.errors.name && formik.touched.name}
              fullWidth
            >
              <TextField
                name="name"
                fullWidth
                value={formik.values.name}
                label="Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.errors.name && formik.touched.name && (
                <FormHelperText>{formik.errors.name}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              error={!!formik.errors.role && formik.touched.role}
              fullWidth
            >
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formik.values.role}
                label="Role"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <MenuItem value="admin">
                  <Iconify icon="ri:admin-fill" />
                  &nbsp; Admin
                </MenuItem>
                <MenuItem value="user">
                  <Iconify icon="mdi:user" />
                  &nbsp; User
                </MenuItem>
              </Select>

              {formik.errors.role && formik.touched.role && (
                <FormHelperText>{formik.errors.role}</FormHelperText>
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
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
