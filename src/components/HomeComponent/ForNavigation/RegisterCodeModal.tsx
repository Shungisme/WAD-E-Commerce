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
import { verifyCodeAccount } from "../../../services/auth";
import { useSnackbar } from "../../../hooks/snackbar";

const schema = yup
  .object({
    code: yup.string().required("Trường code không được để trống"),
  })
  .required();

interface TProps {
  email: string;
  setOpenParent: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterCodeModalComponent = ({ email, setOpenParent }: TProps) => {
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
      showSnackbar("Xác thực thành công", "success");
    } else {
      showSnackbar("Xác thực thất bại", "error");
    }
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack width={"100%"} gap={2}>
          <Typography variant="h3" textAlign={"center"}>
            Xác thực đăng ký
          </Typography>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Box>
                <TextField
                  fullWidth
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
              </Box>
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

export default RegisterCodeModalComponent;
