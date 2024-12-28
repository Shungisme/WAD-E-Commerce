import { useCallback, useState } from "react";
import { useRouter } from "../../hooks/use-router";
import {
  Box,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Iconify } from "../../components/iconify/iconify";
import LoadingButton from "@mui/lab/LoadingButton";

export const SignInView = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = useCallback(() => {
    router.push("/");
  }, [router]);

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="email"
        label="Email address"
        defaultValue="tqtos@gmail.com"
        InputLabelProps={{ shrink: true }}
        sx={{
          mb: 3,
          // "& .MuiOutlinedInput-root": {
          //   "& fieldset": {
          //     borderColor: "grey",
          //   },
          //   "&hover fieldset": {
          //     borderColor: "info.main",
          //   },
          //   "&.Mui-focused fieldset": {
          //     borderColor: "info.main",
          //     borderWidth: 2,
          //   },
          // },
          // "& .MuiInputLabel-root.Mui-focused": {
          //   color: "info.main",
          // },
        }}
      />

      <TextField
        fullWidth
        name="password"
        label="Password"
        defaultValue="@tqtos"
        InputLabelProps={{
          shrink: true,
        }}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                <Iconify
                  icon={
                    showPassword ? "solar:eye-bold" : "solar:eye-closed-bold"
                  }
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 3,
          // "& .MuiOutlinedInput-root": {
          //   "& fieldset": {
          //     borderColor: "grey",
          //     color: "grey",
          //   },
          //   "&hover fieldset": {
          //     borderColor: "info.main",
          //   },
          //   "&.Mui-focused fieldset": {
          //     borderColor: "info.main",
          //     borderWidth: 2,
          //   },
          // },
          // "& .MuiInputLabel-root.Mui-focused": {
          //   color: "info.main",
          // },
        }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignIn}
      >
        Sign in
      </LoadingButton>
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
    </>
  );
};
