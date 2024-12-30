import { useState, useCallback } from "react";
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
import { AccountProps } from "./account-table-row";
import axios from "axios";
import { alpha } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";

export type AddAccountDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (account: Partial<AccountProps & { password: string }>) => void;
};

const cloudinaryConfig = {
  cloudName: "dwkunsgly",
  uploadPreset: "WAD-Ecommerce",
};

const validationSchema = new Yup.ObjectSchema({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /[!@#$%^&*_]/,
      "Password must contain at least one special character"
    )
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  role: Yup.string()
    .oneOf(["admin", "user"], "Invalid role")
    .required("Role is required"),
  avatar: Yup.mixed().required("Avatar is required"),
});

export default function AddAccountDialog({
  open,
  onClose,
  onCreate,
}: AddAccountDialogProps) {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
      avatar: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (
      value: Omit<AccountProps, "id" | "status"> & { password: string }
    ) => {
      const formData = new FormData();
      formData.append("file", value.avatar);
      formData.append("upload_preset", cloudinaryConfig.uploadPreset);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        formData
      );

      const avatar = await response.data;

      onCreate({
        name: value.name,
        email: value.email,
        password: value.password,
        role: value.role,
        avatar: avatar.secure_url,
      });

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
          Add Account
        </Typography>
      </DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <DialogContent>
            <Box
              sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 3 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  src={formik.values.avatar}
                  sx={{ width: 80, height: 80 }}
                />
                <FormControl
                  required
                  error={!!formik.errors.avatar && formik.touched.avatar}
                >
                  <IconButton component="label">
                    <input
                      name="avatar"
                      type="file"
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
                fullWidth
                required
                error={!!formik.errors.name && formik.touched.name}
              >
                <TextField
                  name="name"
                  fullWidth
                  label="Name"
                  autoComplete="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.name && formik.touched.name && (
                  <FormHelperText>{formik.errors.name}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                required
                error={!!formik.errors.email && formik.touched.email}
              >
                <TextField
                  name="email"
                  fullWidth
                  label="Email"
                  type="email"
                  autoComplete="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.email && formik.touched.email && (
                  <FormHelperText>{formik.errors.email}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                required
                error={!!formik.errors.password && formik.touched.password}
              >
                <TextField
                  name="password"
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.password && formik.touched.password && (
                  <FormHelperText>{formik.errors.password}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                required
                error={!!formik.errors.role && formik.touched.role}
              >
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  label="Role"
                  defaultValue="user"
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
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Create Account
            </Button>
          </DialogActions>
        </FormGroup>
      </form>
    </Dialog>
  );
}
