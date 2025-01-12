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
import { resetPassword, verifyCodeAccount } from "../../../services/auth";
import { useSnackbar } from "../../../hooks/snackbar";
import { useMutation } from "@tanstack/react-query";
import { memo, useState } from "react";
import AnnouceModalComponent from "../../AnnouceModalComponent";

const schema = yup
  .object({
    code: yup.string().required("Trường code không được để trống"),
  })
  .required();

interface TProps {
  email: string;
  setOpenParent: React.Dispatch<React.SetStateAction<boolean>>;
  type: "reset" | "verify";
}

const RegisterCodeModalComponent = ({ email, setOpenParent, type }: TProps) => {
  const { showSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);

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

  const mutation = useMutation({
    mutationKey: ["verify-code"],
    mutationFn: async (data: any) => {
      if (type === "reset") {
        const response = await resetPassword(data?.email, data?.code);
        return response;
      } else {
        const response = await verifyCodeAccount(data?.email, data?.code);
        return response;
      }
    },
    onSuccess: () => {
      setOpenParent(false);
      if(type === "reset"){
        showSnackbar("Xác thực thành công. Vui lòng kiểm tra email để nhận mật khảu mới", "success");
        return
      }
      showSnackbar("Xác thực thành công", "success");
    },
    onError: () => {
      showSnackbar("Xác thực thất bại", "error");
    },
  });

  const onSubmit = async (data: any) => {
    await mutation.mutate({
      email: email,
      code: data?.code,
    });
  };

  return (
    <>
      <AnnouceModalComponent
        open={open}
        setOpen={setOpen}
        bodyContent="Vui lòng kiểm tra email để lấy mật khẩu mới"
        header="Thông báo"
        doCancel={() => setOpen(false)}
        doOk={() => setOpen(false)}
      />
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack width={"100%"} gap={2}>
          <Typography variant="h3" textAlign={"center"}>
            Xác thực
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

export default memo(RegisterCodeModalComponent);
