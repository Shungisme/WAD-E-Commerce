import { useCallback, useState } from "react";
import { useRouter } from "../../hooks/use-router";
import {
  Box,
  FormControl,
  FormHelperText,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import { useFormik } from "formik";
import useAuthAdmin from "../../hooks/use-auth-admin";

const validationSchema = new Yup.ObjectSchema({
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
});

export const SignInView = () => {
  const router = useRouter();
  const { loginAdmin } = useAuthAdmin();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (value) => {
      try {
        await loginAdmin(value);
        router.replace("/admin");
      } catch (error) {
        setOpenSnackbar(true);
      }
    },
  });

  const handleClose = useCallback(() => {
    setOpenSnackbar(false);
  }, []);

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          fullWidth
          error={!!formik.errors.email && formik.touched.email}
          sx={{
            mb: 3,
          }}
        >
          <TextField
            fullWidth
            name="email"
            label="Email address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="email"
          />

          {formik.errors.email && formik.touched.email && (
            <FormHelperText>{formik.errors.email}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          fullWidth
          error={!!formik.errors.password && formik.touched.password}
          sx={{
            mb: 3,
          }}
        >
          <TextField
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="current-password"
          />

          {formik.errors.password && formik.touched.password && (
            <FormHelperText>{formik.errors.password}</FormHelperText>
          )}
        </FormControl>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
        >
          Sign in
        </LoadingButton>
      </form>
    </Box>
  );

  return (
    <>
      <Box
        gap={1.5}
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ mb: 5 }}
      >
        <Typography variant="h5">Sign in</Typography>
      </Box>

      {renderForm}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Email or password is incorrect"
      />
    </>
  );
};
