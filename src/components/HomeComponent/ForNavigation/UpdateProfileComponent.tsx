import {
  Avatar,
  Button,
  Divider,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import { memo, useState } from "react";
import { useSnackbar } from "../../../hooks/snackbar";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../../../services/auth";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import SpinnerFullScreen from "../../SpinnerFullScreen";

const schema = yup
  .object({
    name: yup.string().required("Nhập tên người dùng"),
  })
  .required();

const cloudinaryConfig = {
  cloudName: String(process.env.REACT_APP_CLOUDINARY_CLOUD_NAME) || "",
  uploadPreset: String(process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET) || "",
};

const UpdateProfileComponent = () => {
  const { user,setUser } = useAuth();
  const [avatar, setAvatar] = useState<string>(user?.avatar || "");
  const [file, setFile] = useState<File | null>(null);
  const { showSnackbar } = useSnackbar();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: user?.name || "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      showSnackbar(
        "File bạn chọn vượt quá dung lượng cho phép (5MB).",
        "error"
      );
      return;
    }

    setFile(file);

    const objectUrl = URL.createObjectURL(file);
    setAvatar(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  };

  const mutation = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async (data: any) => {
      const response = await updateProfile(user?._id || "", data);
      return response;
    },
    onSuccess: (res:any) => {
      setUser(res?.user)
      showSnackbar("Cập nhật thông tin thành công", "success");
    },
    onError: () => {
      showSnackbar("Cập nhật thông tin thất bại", "error");
    },
  });

  const onSubmit = async (data: any) => {
    let avatarUrl = avatar;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", cloudinaryConfig.uploadPreset);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        formData
      );

      avatarUrl = response.data.secure_url;
    }
    await mutation?.mutate({
      name: data?.name,
      avatar: avatarUrl,
    });
  };

  return (
    <>
      {mutation?.isPending && <SpinnerFullScreen />}
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h3" textAlign={"center"} mb={2}>Cập nhật thông tin</Typography>
        <Stack
          width={"100%"}
          direction={"column"}
          gap={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Stack gap={1}>
            <Avatar
              sx={{
                width: "100px",
                height: "100px",
              }}
              src={avatar}
            />
            <Button variant="contained" component="label">
              Tải ảnh
              <input onChange={(e) => handleChooseFile(e)} type="file" hidden />
            </Button>
          </Stack>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Stack>
                  <TextField
                    variant="filled"
                    label="Tên"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  {errors.name && (
                    <FormHelperText sx={{ color: "red" }}>
                      {errors.name.message}
                    </FormHelperText>
                  )}
                </Stack>
              </>
            )}
            name="name"
          />

          <Divider />

          <Button type="submit" fullWidth variant="contained">
            Xác nhận
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default memo(UpdateProfileComponent);
