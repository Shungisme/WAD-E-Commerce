import {
  Box,
  Grid,
  Grid2,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import IconifyIcon from "../iconifyIcon";

const FooterComponent = () => {
  const theme = useTheme();

  return (
    <>
      <Paper
        sx={{
          mt: 5,
          width: "98.9",
          padding: 10,
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.customColors.lightPaperBg
              : theme.customColors.darkPaperBg,
        }}
      >
        <Box
          sx={{
            maxWidth: "90%",
            mx: "0 auto",
          }}
        >
          <Grid2
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Grid
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
                gap: 2,
                width: "30%",
              }}
            >
              <Typography
                fontWeight={"bold"}
                color={theme.palette.primary.main}
                fontSize={"1.5rem"}
              >
                Về chúng tôi
              </Typography>
              <Typography
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.common.black
                      : theme.palette.common.white,
                }}
              >
                TẠI <strong>HCMUS</strong> Mỗi ngày chúng tôi đều chăm chỉ cùng
                với tâm huyết, để trao đến bạn những sản phẩm chất lượng nhất và
                từng sản phẩm tạo ra đều mang trong mình một giá trị cao cả.
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
                gap: "0.2rem",
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.common.black
                    : theme.palette.common.white,
              }}
            >
              <Typography display={"flex"} gap={1}>
                <strong>Điện thoại: </strong> xxxxxxx789
              </Typography>
              <Typography display={"flex"} gap={1}>
                <strong>Email: </strong> xxxxx@gmail.com
              </Typography>
            </Grid>

            <Grid
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
                gap: 2,
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.common.black
                    : theme.palette.common.white,
              }}
            >
              <Typography
                fontWeight={"bold"}
                color={theme.palette.primary.main}
                fontSize={"1.5rem"}
              >
                Chăm sóc khách hàng
              </Typography>

              <Grid2 container columnSpacing={1}>
                <Grid item alignContent={"center"}>
                  <IconifyIcon
                    icon={"line-md:phone-call-loop"}
                    fontSize={"2rem"}
                  />
                </Grid>

                <Grid item>
                  <Typography
                    color={theme.palette.primary.main}
                    fontWeight={"bold"}
                  >
                    xxxxxxx789
                  </Typography>
                  <Typography
                    sx={{
                      textDecoration: "underline",
                    }}
                  >
                    xxxxx@gmail.com
                  </Typography>
                </Grid>
              </Grid2>
              <Grid>
                <Typography fontWeight={"bold"}>Follow us</Typography>
                <Box>
                  <IconButton>
                    <IconifyIcon icon={"logos:linkedin-icon"} />
                  </IconButton>
                  <IconButton>
                    <IconifyIcon icon={"logos:facebook"} />
                  </IconButton>
                  <IconButton>
                    <IconifyIcon icon={"skill-icons:instagram"} />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Grid2>
        </Box>
      </Paper>
    </>
  );
};

export default FooterComponent;
