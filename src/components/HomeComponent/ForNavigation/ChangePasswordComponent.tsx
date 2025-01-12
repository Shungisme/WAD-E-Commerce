import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import IconifyIcon from "../../iconifyIcon";
import { memo, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { changePassword, receciveCode } from "../../../services/auth";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AnnouceModalComponent from "../../AnnouceModalComponent";
import { useMutation } from "@tanstack/react-query";
import SpinnerFullScreen from "../../SpinnerFullScreen";
import { useSnackbar } from "../../../hooks/snackbar";

const schema = yup
  .object({
    oldPassword: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Phải chứa 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
      )
      .required("Vui lòng nhập mật khẩu cũ"),
    newPassword: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Phải chứa 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
      )
      .required("Vui lòng nhập mật khẩu mới"),
    code: yup.string().required("Vui lòng nhập code"),
  })
  .required();

interface TProps {
  setOpenParent: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePasswordComponent = ({ setOpenParent }: TProps) => {
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();
  const { logoutAuth } = useAuth();

  const { user } = useAuth();
  const theme = useTheme();

  const mutate = useMutation({
    mutationKey: ["change-password"],
    mutationFn: async (data: any) => {
      const response = await changePassword(data);
      return response;
    },
    onSuccess: () => {
      setOpenModal(true);
    },
    onError: () => {
      showSnackbar("Đổi mật khẩu thất bại", "error");
    },
  });

  const code = useMutation({
    mutationKey: ["take-code"],
    mutationFn: async (email: string) => {
      const response = await receciveCode(email, "change-password");
      return response;
    },
    onSuccess: () => {
      showSnackbar("Đã gửi code thành công", "success");
    },
    onError: () => {
      showSnackbar("Gửi code thất bại", "error");
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      code: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    await mutate.mutate(data);
  };

  const takeCode = async () => {
    await code.mutate(user?.email || "");
  };

  const handleClose = async () => {
    await logoutAuth();
    setOpenParent(false);
  };

  return (
    <>
      {mutate?.isPending && <SpinnerFullScreen />}
      <AnnouceModalComponent
        header="Thông báo"
        bodyContent="Bạn đã đổi mật khẩu thành công. Vui lòng đăng nhập lại"
        doCancel={handleClose}
        doOk={handleClose}
        open={openModal}
        setOpen={setOpenModal}
      />
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack alignItems={"center"} gap={2} width={"100%"}>
          <Typography variant="h3" textAlign={"center"}>
            Đổi mật khẩu
          </Typography>
          <Stack width={"100%"}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  fullWidth
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  label="Mật khẩu cũ"
                  type={showOldPassword ? "text" : "password"}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowOldPassword(!showOldPassword)}
                          >
                            <IconifyIcon
                              style={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? "white"
                                    : "black",
                              }}
                              icon={
                                showOldPassword
                                  ? "material-symbols:visibility-off"
                                  : "ic:sharp-visibility"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}
              name="oldPassword"
            />
            {errors.oldPassword && (
              <FormHelperText sx={{ color: "red" }}>
                {errors.oldPassword.message}
              </FormHelperText>
            )}
          </Stack>

          <Stack width={"100%"}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  fullWidth
                  label="Mật khẩu mới"
                  type={showNewPassword ? "text" : "password"}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            <IconifyIcon
                              style={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? "white"
                                    : "black",
                              }}
                              icon={
                                showNewPassword
                                  ? "material-symbols:visibility-off"
                                  : "ic:sharp-visibility"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}
              name="newPassword"
            />
            {errors.newPassword && (
              <FormHelperText sx={{ color: "red" }}>
                {errors.newPassword.message}
              </FormHelperText>
            )}
          </Stack>

          <Box width={"100%"}>
            <Box width={"100%"} display={"flex"} alignItems={"center"} gap={2}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    sx={{ width: "60%" }}
                    label="Code"
                    type="text"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="code"
              />

              <Button onClick={() => takeCode()} variant="contained">
                Nhận code
              </Button>
            </Box>
            {errors.code && (
              <FormHelperText sx={{ color: "red" }}>
                {errors.code.message}
              </FormHelperText>
            )}
          </Box>
          <Button type="submit" variant="contained" fullWidth>
            Xác nhận
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default memo(ChangePasswordComponent);
