import { CardContent, Typography, Divider, Button, Box } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface LoginForm {
  email: string;
  password: string;
}

interface TProps{
  navigateToComponent: React.Dispatch<React.SetStateAction<string>>
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
      ).required('Vui lòng nhập mật khẩu'),
  })
  .required();

const LoginComponent = ({navigateToComponent} : TProps) => {
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

  const onSubmit: SubmitHandler<LoginForm> = (data) => {};

  return (
    <>
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
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  id="email"
                  className="
                                w-full 
                                outline-none 
                                px-2
                                py-3
                                border-2 
                                rounded-md
                                text-[13px]
                                peer
                                "
                />
                <label
                  className={`
                    absolute
                    left-[0.55rem]
                    transition-all
                    duration-200
                    ease-in-out
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
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  id="password"
                  className="
                                w-full 
                                outline-none 
                                px-2
                                py-3
                                border-2 
                                rounded-md
                                text-[13px]
                                peer
                                "
                />
                <label
                  className={`
      absolute
      left-[0.55rem]
      transition-all
      duration-200
      ease-in-out
      ${
        value
          ? "text-[10px] top-[2px] translate-y-0"
          : "text-[0.8rem] top-1/2 translate-y-[-50%] peer-focus:text-[10px] peer-focus:top-[2px] peer-focus:translate-y-0"
      }
    `}
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

          <Button
            sx={{
              backgroundColor: "#ffc107",
              color: "black",
            }}
            variant="contained"
            fullWidth
            type="submit"
          >
            Đăng nhập
          </Button>
        </form>
        <Box>
          <Typography fontSize={"0.8rem"} textAlign={"left"}>
            Khách hàng mới ?{" "}
            <span onClick={() => navigateToComponent("register")} className="font-semibold cursor-pointer">Tạo tại khoản</span>
          </Typography>
          <Typography fontSize={"0.8rem"} textAlign={"left"}>
            Quên mật khẩu ?{" "}
            <span onClick={() => navigateToComponent("forgot")} className="font-semibold cursor-pointer">Khôi phục mật khẩu</span>
          </Typography>
        </Box>
      </CardContent>
    </>
  );
};

export default LoginComponent;