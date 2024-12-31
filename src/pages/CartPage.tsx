import {
  Box,
  Button,
  Divider,
  Grid,
  Grid2,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import IconifyIcon from "../components/iconifyIcon";
import { toDiscountPrice } from "../utils/toDiscountPrice";
import { toVND } from "../utils/convertNumberToVND";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import AnnouceModalComponent from "../components/AnnouceModalComponent";

const CartPage = () => {
  const theme = useTheme();
  const { myCart, handleChangeQuantity, handleDelete, totalMoney } = useCart();
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const handlePayment = () => {
    if (!user) {
      setOpenModal(true);
    } else {
      //do payment in this block
    }
  };

  const renderProduct = () => {
    return myCart?.data?.products?.map((item: any, index: any) => {
      const price = toDiscountPrice(item);
      const quantity = item.quantity;
      return (
        <>
          <Grid2
            key={item.productId}
            width={"100%"}
            container
            spacing={5}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item xs={3}>
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    objectFit: "cover",
                    border: `2px solid ${
                      theme.palette.mode === "dark"
                        ? theme.palette.common.white
                        : theme.palette.grey[300]
                    }`,
                    borderRadius: "5px",
                  }}
                  component={"img"}
                  src={item?.thumbnail}
                ></Box>

                <IconButton
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                >
                  <IconifyIcon
                    onClick={() => handleDelete(item)}
                    icon={"typcn:delete"}
                    color={"red"}
                  />
                </IconButton>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography
                  component={"div"}
                  sx={{
                    letterSpacing: "1.5px",
                    fontWeight: 500,
                  }}
                >
                  {item?.title}
                </Typography>
                {item.discount > 0 ? (
                  <>
                    <Stack direction={"row"} gap={2} alignItems={"center"}>
                      <Typography
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: "bolder",
                          fontSize: "1rem",
                        }}
                      >
                        {toVND(price)}
                      </Typography>
                      <Typography
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                          fontSize: "0.8rem",
                          textDecoration: "line-through",
                        }}
                      >
                        {toVND(item?.price)}
                      </Typography>
                    </Stack>
                  </>
                ) : (
                  <>
                    <Typography
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: "bolder",
                        fontSize: "1rem",
                      }}
                    >
                      {toVND(price)}
                    </Typography>
                  </>
                )}
              </Box>
            </Grid>

            <Grid item xs={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  {toVND(price * quantity)}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    onClick={() => handleChangeQuantity(item, "descrease")}
                  >
                    <IconifyIcon icon={"tabler:minus"} />
                  </IconButton>
                  <input
                    type="text"
                    className="text-black outline-none w-8 h-8 text-center border border-gray-300 rounded"
                    style={{
                      width: "50px",
                      appearance: "none",
                      MozAppearance: "textfield",
                    }}
                    value={String(quantity)}
                    onChange={async (e) => {
                      let val = e?.target?.value;

                      if (isNaN(Number(val)) || Number(val) < 0) return;
                      await handleChangeQuantity(item, "input", Number(val));
                    }}
                    onBlur={async () => {
                      if (quantity === 0) {
                        await handleChangeQuantity(item, "input", 1);
                      }
                    }}
                  />
                  <IconButton
                    onClick={() => handleChangeQuantity(item, "inscrese")}
                  >
                    <IconifyIcon icon={"mynaui:plus"} />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid2>
          {index < myCart?.data?.products?.length - 1 && (
            <Divider sx={{ width: "100%", my: 3 }} />
          )}
        </>
      );
    });
  };

  return (
    <>
      <AnnouceModalComponent
        header="Thông báo"
        bodyContent="Vui lòng đăng nhập trước khi thanh toán"
        open={openModal}
        setOpen={setOpenModal}
        doCancel={() => setOpenModal(false)}
        doOk={() => setOpenModal(false)}
      />
      <Box
        sx={{
          maxWidth: "90%",
          margin: "0 auto",
          mt: "2rem",
          minHeight: "70vh",
        }}
      >
        {myCart?.data?.products?.length !== 0 ? (
          <>
            <Grid2 container justifyContent={"space-around"}>
              <Grid item xs={8} width={"60%"}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "left",
                    flexDirection: "column",
                    gap: "0.8rem",
                  }}
                >
                  <Typography fontWeight={"bold"} fontSize={"2rem"}>
                    Giỏ hàng của bạn
                  </Typography>
                  <Divider sx={{ width: "100%" }} />
                  <Typography>
                    Bạn đang có{" "}
                    <strong>{myCart?.data?.products?.length} sản phẩm</strong>{" "}
                    trong giỏ hàng
                  </Typography>
                  <Box
                    sx={{
                      border: `2px solid ${
                        theme.palette.mode === "dark"
                          ? theme.palette.common.white
                          : theme.palette.grey[500]
                      }`,
                      borderRadius: "6px",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        padding: 3,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "0.5rem",
                        width: "100%",
                      }}
                    >
                      {renderProduct()}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4} alignItems={"center"} width={"35%"}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "left",
                    flexDirection: "column",
                    gap: "0.8rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "2rem",
                    }}
                  >
                    Thông tin đơn hàng
                  </Typography>

                  <Divider />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      Tổng tiền:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: theme.palette.primary.main,
                      }}
                    >
                      {toVND(totalMoney)}
                    </Typography>
                  </Box>
                  <Divider />
                  <Typography>
                    Thời gian giao hàng từ 3 đến 5 ngày kể từ khi xác nhận đơn
                    hàng.
                  </Typography>
                  <Button onClick={handlePayment} variant="contained">
                    Thanh toán
                  </Button>
                </Box>
              </Grid>
            </Grid2>
          </>
        ) : (
          <>
            <Box textAlign={"center"}>
              <Typography fontWeight={"bold"} fontSize={"2rem"}>
                Không có sản phẩm trong giỏ hàng
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default CartPage;
