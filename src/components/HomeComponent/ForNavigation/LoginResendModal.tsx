import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import {
  Box,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { receciveCode, verifyCodeAccount } from "../../../services/auth";
import { useSnackbar } from "../../../hooks/snackbar";
import { memo } from "react";

const schema = yup
  .object({
    code: yup.string().required("Trường code không được để trống"),
  })
  .required();

interface TProps {
  email: string;
  setOpenParent: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginResendModalComponent = ({ email, setOpenParent }: TProps) => {
  const { showSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { code: string }) => {
    const response = await verifyCodeAccount(email, data?.code);
    if (response?.message === "Verification successful") {
      setOpenParent(false);
      showSnackbar("Xác thực thành công. Vui lòng đăng nhập lại", "success");
    } else {
      showSnackbar("Xác thực thất bại", "error");
    }
  };

  const handleResend = async () => {
    const response = await receciveCode(email,'verify');
    if(response){
        showSnackbar("Đã gửi mã thành công",'success')
    } else {
        showSnackbar("Gửi mã thất bại",'error')
    }
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack width={"100%"} gap={2} justifyContent={"center"} alignItems={"center"}>
          <Typography variant="h3" textAlign={"center"}>
            Gửi lại mã
          </Typography>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Box width={"100%"} display={"flex"} justifyContent={"center"} gap={1}>
                  <TextField
                    sx={{
                      width: "70%",
                    }}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    label="Code"
                  />
                  {errors.code && (
                    <FormHelperText sx={{ color: "red" }}>
                      {errors.code.message}
                    </FormHelperText>
                  )}
                  <Button sx={{
                    width: "30%"
                  }} onClick={() => handleResend()} variant="contained">
                    Gửi lại
                  </Button>
                </Box>
              </>
            )}
            name="code"
          />

          <Button variant="contained" fullWidth type="submit">
            Xác thực
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default memo(LoginResendModalComponent);
