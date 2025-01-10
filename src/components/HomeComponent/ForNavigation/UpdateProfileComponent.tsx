import { Avatar, Button, Divider, Stack, TextField } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import { useState } from "react";

const UpdateProfileComponent = () => {
  const { user } = useAuth();
  const [changeVal, setChangeVal] = useState<string>(user?.name || "");

  const onSubmit = async () => {};

  return (
    <Stack
      width={"100%"}
      direction={"column"}
      gap={3}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack gap={1}>
        <Avatar
          sx={{
            width: "100px",
            height: "100px",
          }}
          src={user?.avatar}
        />
        <Button variant="contained" component="label">
          Tải ảnh
          <input type="file" hidden />
        </Button>
      </Stack>
      <TextField
        value={changeVal}
        onChange={(e) => setChangeVal(e?.target?.value)}
        variant="filled"
        label="Tên"
      />
      <Divider />

      <Button onClick={() => onSubmit()} fullWidth variant="contained">
        Xác nhận
      </Button>
    </Stack>
  );
};

export default UpdateProfileComponent;
