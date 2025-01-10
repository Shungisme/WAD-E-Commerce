import {
  CardContent,
  Typography,
  Divider,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { receciveCode } from "../../../services/auth";
import SpinnerFullScreen from "../../SpinnerFullScreen";
import ModalComponent from "../../ModalComponent";
import RegisterCodeModalComponent from "./RegisterCodeModal";
import { useState } from "react";
import { useSnackbar } from "../../../hooks/snackbar";

interface ForgotForm {
  email: string;
}

interface TProps {
  navigateToComponent: React.Dispatch<React.SetStateAction<string>>;
}

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email không đúng định dạng")
      .required("Vui lòng nhập email"),
  })
  .required();

const ForgotPasswordComponent = ({ navigateToComponent }: TProps) => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const {showSnackbar} = useSnackbar()

  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<ForgotForm>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationKey: ["reset-password-key"],
    mutationFn: async (email: any) => {
      const response = await receciveCode(email, "reset-password");
      return response;
    },
    onSuccess: () => {
      setOpenModal(true);
      showSnackbar("Mã code đã được gửi vào mail của bạn","success")
      
    },
    onError: () => {
      showSnackbar("Gửi code thất bại. Xin thử lại",'success')
    },
  });

  const onSubmit: SubmitHandler<ForgotForm> = async (data) => {
    await mutation?.mutate(data?.email);
  };


  return (
    <>
      {mutation?.isPending && <SpinnerFullScreen />}
      <ModalComponent open={openModal} setOpen={setOpenModal}>
        <RegisterCodeModalComponent
          setOpenParent={setOpenModal}
          email={getValues("email")}
          type="reset"
        />
      </ModalComponent>
      <CardContent>
        <Typography fontSize={"1.1rem"} fontWeight={"bold"}>
          Quên mật khẩu
        </Typography>
        <Typography fontSize={"0.8rem"}>
          Quên mật khẩu đã có chúng tôi lo
        </Typography>
      </CardContent>

      <Divider />

      <CardContent className="flex flex-col gap-3">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <div className="relative mb-3">
                <input
                  style={{
                    color: theme.palette.common.black,
                  }}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  id="email"
                  className="w-full outline-none px-2 py-3 border-2 rounded-md text-[13px] peer"
                />
                <label
                  style={{
                    color: theme.palette.common.black,
                  }}
                  className={`absolute left-[0.55rem] transition-all duration-200 ease-in-out ${
                    value
                      ? "text-[10px] top-[2px] translate-y-0"
                      : "text-[0.8rem] top-1/2 translate-y-[-50%] peer-focus:text-[10px] peer-focus:top-[2px] peer-focus:translate-y-0"
                  }`}
                  htmlFor="email"
                >
                  Email
                </label>
              </div>
            )}
            name="email"
          />
          {errors.email && (
            <Typography
              textAlign={"left"}
              fontSize={"0.7rem"}
              color="error"
              mt={"-0.75rem"}
            >
              {errors.email.message}
            </Typography>
          )}

          <Button variant="contained" fullWidth type="submit">
            Khôi phục
          </Button>
        </form>
        <Box>
          <Typography fontSize={"0.8rem"} textAlign={"left"}>
            Đã nhớ mật khẩu ?{" "}
            <span
              onClick={() => navigateToComponent("login")}
              className="font-semibold cursor-pointer"
            >
              Trở về đăng nhập
            </span>
          </Typography>
        </Box>
      </CardContent>
    </>
  );
};

export default ForgotPasswordComponent;
