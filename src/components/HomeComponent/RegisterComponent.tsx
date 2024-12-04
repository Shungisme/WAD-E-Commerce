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

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface TProps {
  navigateToComponent: React.Dispatch<React.SetStateAction<string>>;
}

const schema = yup
  .object({
    firstName: yup.string().required("Vui lòng nhập tên"),
    lastName: yup.string().required("Vui lòng nhập họ"),
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
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Vui lòng nhập đúng mật khẩu")
      .required("Vui lòng nhập lại mật khẩu"),
  })
  .required();

const RegisterComponent = ({ navigateToComponent }: TProps) => {
  const theme = useTheme();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RegisterForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<RegisterForm> = (data) => {};

  return (
    <>
      <CardContent>
        <Typography fontSize={"1.1rem"} fontWeight={"bold"}>
          Đăng ký tài khoản
        </Typography>
        <Typography fontSize={"0.8rem"}>Hãy mua sắm cùng chúng tôi</Typography>
      </CardContent>

      <Divider />

      <CardContent className="flex flex-col gap-3">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box className="flex justify-center items-center gap-2 mb-3">
            <Box className="flex justify-center gap-[1px] flex-col">
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <div className="relative">
                    <input
                      style={{
                        color: theme.palette.common.black,
                      }}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      id="firstName"
                      className="w-full  outline-none px-2 py-3 border-2 rounded-md text-[13px] peer"
                    />
                    <label
                      style={{
                        color: theme.palette.common.black,
                      }}
                      className={` absolute left-[0.55rem] transition-all duration-200 ease-in-out ${
                        value
                          ? "text-[10px] top-[2px] translate-y-0"
                          : "text-[0.8rem] top-1/2 translate-y-[-50%] peer-focus:text-[10px] peer-focus:top-[2px] peer-focus:translate-y-0"
                      }`}
                      htmlFor="firstName"
                    >
                      Firstname
                    </label>
                  </div>
                )}
                name="firstName"
              />
              {errors.firstName && (
                <Typography
                  textAlign={"left"}
                  fontSize={"0.7rem"}
                  color="error"
                >
                  {errors.firstName.message}
                </Typography>
              )}
            </Box>

            <Box className="flex justify-center  gap-[1px] flex-col">
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <div className="relative">
                    <input
                      style={{
                        color: theme.palette.common.black,
                      }}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      id="lastName"
                      className="w-full outline-none px-2 py-3 border-2 rounded-md text-[13px] peer"
                    />
                    <label
                      style={{
                        color: theme.palette.common.black,
                      }}
                      className={`absolute left-[0.55rem] transition-all duration-200  ease-in-out ${
                        value
                          ? "text-[10px] top-[2px] translate-y-0"
                          : "text-[0.8rem] top-1/2 translate-y-[-50%] peer-focus:text-[10px] peer-focus:top-[2px] peer-focus:translate-y-0"
                      }`}
                      htmlFor="lastName"
                    >
                      Lastname
                    </label>
                  </div>
                )}
                name="lastName"
              />
              {errors.lastName && (
                <Typography
                  textAlign={"left"}
                  fontSize={"0.7rem"}
                  color="error"
                >
                  {errors.lastName.message}
                </Typography>
              )}
            </Box>
          </Box>

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
                  } `}
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
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  id="password"
                  className="w-full outline-none px-2 py-3 border-2 rounded-md text-[13px] peer"
                />
                <label
                  style={{
                    color: theme.palette.common.black,
                  }}
                  className={` absolute left-[0.55rem] transition-all duration-200 ease-in-out ${
                    value
                      ? "text-[10px] top-[2px] translate-y-0"
                      : "text-[0.8rem] top-1/2 translate-y-[-50%] peer-focus:text-[10px] peer-focus:top-[2px] peer-focus:translate-y-0"
                  }`}
                  htmlFor="password"
                >
                  Password
                </label>
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
                  id="confirmPassword"
                  className="w-full outline-none px-2 py-3 border-2 rounded-md text-[13px] peer "
                />
                <label
                  style={{
                    color: theme.palette.common.black,
                  }}
                  className={` absolute left-[0.55rem] transition-all duration-200 ease-in-out ${
                    value
                      ? "text-[10px] top-[2px] translate-y-0"
                      : "text-[0.8rem] top-1/2 translate-y-[-50%] peer-focus:text-[10px] peer-focus:top-[2px] peer-focus:translate-y-0"
                  }`}
                  htmlFor="confirmPassword"
                >
                  Confirm password
                </label>
              </div>
            )}
            name="confirmPassword"
          />
          {errors.confirmPassword && (
            <Typography
              textAlign={"left"}
              fontSize={"0.7rem"}
              color="error"
              mt={"-0.75rem"}
            >
              {errors.confirmPassword.message}
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            type="submit"
          >
            Đăng ký
          </Button>
        </form>
        <Box>
          <Typography fontSize={"0.8rem"} textAlign={"left"}>
            Đã có tài khoản ?{" "}
            <span
              onClick={() => navigateToComponent("login")}
              className="font-semibold cursor-pointer"
            >
              Quay lại trang đăng nhập
            </span>
          </Typography>
        </Box>
      </CardContent>
    </>
  );
};

export default RegisterComponent;
