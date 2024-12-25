import {
  CardContent,
  Typography,
  Divider,
  Button,
  Box,
  useTheme,
  IconButton,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import IconifyIcon from "../../iconifyIcon";
import { useState } from "react";
import { getAuthGoogleUrl } from "../../../services/auth";
import { TUser } from "../../../types/userType";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import SpinnerFullScreen from "../../SpinnerFullScreen";


interface LoginForm {
  email: string;
  password: string;
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
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Phải chứa 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
      )
      .required("Vui lòng nhập mật khẩu"),
  })
  .required();

const LoginComponent = ({ navigateToComponent }: TProps) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {loginAuth} = useAuth();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationKey:["login-user"],
    mutationFn: async (data:TUser) => {
      const response = await loginAuth(data)
      return response
    },
  })

  const onSubmit: SubmitHandler<any> = async (data: TUser) => {
    const response = await loginAuth(data);
    return response;
  };

  return (
    <>
      {mutation.isPending && <SpinnerFullScreen/>}
      <CardContent>
        <Typography fontSize={"1.1rem"} fontWeight={"bold"}>
          Đăng nhập tài khoản
        </Typography>
        <Typography fontSize={"0.8rem"}>
          Nhập email và mật khẩu của bạn
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
                  className=" w-full outline-none px-2 py-3 border-2 rounded-md text-[13px] peer"
                />
                <label
                  style={{
                    color: theme.palette.common.black,
                  }}
                  className={`absolute left-[0.55rem] transition-all duration-200 ease-in-out
                ${
                  value
                    ? "text-[10px] top-[2px] translate-y-0"
                    : "text-[0.8rem] top-1/2 translate-y-[-50%] peer-focus:text-[10px] peer-focus:top-[2px] peer-focus:translate-y-0"
                }
                `}
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
                  id="password"
                  className=" w-full outline-none px-2 py-3 border-2 rounded-md text-[13px] peer"
                  type={showPassword ? "text" : "password"}
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
                  htmlFor="password"
                >
                  Password
                </label>
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <IconifyIcon
                    icon={
                      showPassword
                        ? "ic:sharp-visibility"
                        : "material-symbols:visibility-off"
                    }
                  />
                </IconButton>
              </div>
            )}
            name="password"
          />
          {errors.password && (
            <Typography
              textAlign={"left"}
              fontSize={"0.7rem"}
              color="error"
              mt={"-0.75rem"}
            >
              {errors.password.message}
            </Typography>
          )}

          <Button variant="contained" fullWidth type="submit">
            Đăng nhập
          </Button>
        </form>
        <Box>
          <Typography fontSize={"0.8rem"} textAlign={"left"}>
            Khách hàng mới ?{" "}
            <span
              onClick={() => navigateToComponent("register")}
              className="font-semibold cursor-pointer"
            >
              Tạo tại khoản
            </span>
          </Typography>
          <Typography fontSize={"0.8rem"} textAlign={"left"}>
            Quên mật khẩu ?{" "}
            <span
              onClick={() => navigateToComponent("forgot")}
              className="font-semibold cursor-pointer"
            >
              Khôi phục mật khẩu
            </span>
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <Box mt={1}>
        <Typography component={"div"} fontSize={"0.8rem"}>
          Đăng nhập bằng
        </Typography>
        <IconButton onClick={() => {window.location.href = getAuthGoogleUrl()}}>
          <IconifyIcon icon={"flat-color-icons:google"} />
        </IconButton>
      </Box>
    </>
  );
};

export default LoginComponent;
