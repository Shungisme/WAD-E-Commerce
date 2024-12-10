import {
  Box,
  Button,
  Divider,
  Grid,
  Grid2,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { CART_CONSTANT } from "../mocks/cart";
import {  useMemo, useState } from "react";
import IconifyIcon from "../components/iconifyIcon";
import { toDiscountPrice } from "../utils/toDiscountPrice";
import { toVND } from "../utils/convertNumberToVND";

const CartPage = () => {
  const theme = useTheme();
  const MyProducts = CART_CONSTANT;
  const transformedProducts = CART_CONSTANT.products.reduce((acc, item) => {
    acc[item.product.id] = item.quantity;
    return acc;
  }, {} as Record<string, number>);

  const [quantityVal, setQuantityVal] =
    useState<Record<string, number>>(transformedProducts);

  const quantityInStock = useMemo(() => {
    return MyProducts.products.reduce((total, currentValue) => {
      return total + currentValue.quantity;
    }, 0);
  }, [MyProducts.products]);

  const totalPrice = useMemo(() => {
    return MyProducts.products.reduce((acc, item) => {
      const price = toDiscountPrice(item.product);
      const quantity = quantityVal[item.product.id] || 0;
      return acc + price * quantity;
    }, 0);
  }, [quantityVal, MyProducts.products]);



  const renderProduct = () => {
    return MyProducts.products.map((item, index) => {
      const price = toDiscountPrice(item.product);
      const quantity = item.quantity;
      const total = price * quantity;
      return (
        <>
          <Grid2
            key={index}
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
                  src={item.product.thumbnail}
                ></Box>

                <IconButton
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                >
                  <IconifyIcon icon={"typcn:delete"} color={"red"} />
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
                  {item.product.name}
                </Typography>
                <Typography
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                    fontSize: "0.8rem",
                  }}
                >
                  {toVND(price)}
                </Typography>
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
                  {toVND(total)}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton>
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
                    value={String(quantityVal[item.product.id])}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        setQuantityVal({
                          ...quantityVal,
                        });
                        return;
                      }
                      let value = Number(e.target.value);
                      if (value < 0) {
                        setQuantityVal({
                          ...quantityVal,
                          [item.product.id]: 0,
                        });
                      } else {
                        setQuantityVal({
                          ...quantityVal,
                          [item.product.id]: value,
                        });
                      }
                    }}
                  />
                  <IconButton>
                    <IconifyIcon icon={"mynaui:plus"} />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid2>
          {index < MyProducts.products.length - 1 && (
            <Divider sx={{ width: "100%", my: 3 }} />
          )}
        </>
      );
    });
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: "90%",
          margin: "0 auto",
          mt:"2rem"
        }}
      >
        {quantityInStock !== 0 ? (
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
                    Bạn đang có <strong>{quantityInStock} sản phẩm</strong>{" "}
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
                      {toVND(totalPrice)}
                    </Typography>
                  </Box>
                  <Divider />
                  <Typography>Thời gian giao hàng từ 3 đến 5 ngày kể từ khi xác nhận đơn hàng.</Typography>
                  <Button variant="contained">Thanh toán</Button>
                </Box>
              </Grid>
            </Grid2>
          </>
        ) : (
          <>
            <Typography>Không có sản phẩm trong giỏ hàng</Typography>
          </>
        )}
      </Box>
    </>
  );
};

export default CartPage;
