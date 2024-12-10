import {
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  Grid2,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import IconifyIcon from "../../iconifyIcon";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANT } from "../../../constants/routesConstants";
import { CART_CONSTANT } from "../../../mocks/cart";
import { toDiscountPrice } from "../../../utils/toDiscountPrice";
import { toVND } from "../../../utils/convertNumberToVND";
import { PRODUCT_FOR_CART } from "../../../types/productType";

const CartDropDownComponent = () => {
  const cart = CART_CONSTANT;

  const transformCart = cart.products.reduce((acc, currentValue) => {
    acc[currentValue.product.id] = currentValue.quantity;
    return acc;
  }, {} as Record<string, number>);

  const [quantityVal,setQuantityVal] = useState<Record<string,number>>(transformCart);

  const totalMoney = useMemo(() => {
     return cart.products.reduce((acc,currentValue) => {
        const quantity = currentValue.quantity;
        const price = toDiscountPrice(currentValue.product);
        return acc = acc + quantity*price
     },0)
  }, [cart.products]);

  const theme = useTheme();
  const navigate = useNavigate();



  const handleIncrease = (item:PRODUCT_FOR_CART) => {

  }

  const handleDecrease = (item:PRODUCT_FOR_CART) => {
    
  }



  const renderProductsInCart = () => {
    return cart.products.map((item, index) => {
      const quantity = item.quantity;
      const price = toDiscountPrice(item.product);
      const total = quantity * price;
      return (
        <>
          <Grid2
            width={"100%"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            container
            key={index}
          >
            <Grid item>
              <Box>
                <Box
                  sx={{
                    width: "6rem",
                    height: "6rem",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  component={"img"}
                  src={item.product.thumbnail}
                />
              </Box>
            </Grid>

            <Grid item height={"100%"}>
              <Box sx={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                flexDirection:"column",
                gap:1
              }}>
                <Typography fontWeight={"bold"}>{item.product.name}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconButton>
                    <IconifyIcon icon={"tabler:minus"} />
                  </IconButton>
                  <input
                    type="text"
                    className="text-black outline-none w-6 h-6 text-center border border-gray-300 rounded"
                    disabled
                    value={item.quantity}
                  />
                  <IconButton>
                    <IconifyIcon icon={"mynaui:plus"} />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
            <Grid item height={"100%"}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap:5,
                  height: "100%",
                }}
              >
                <IconifyIcon
                  cursor={"pointer"}
                  fontSize={"0.7rem"}
                  color="red"
                  icon={"streamline:delete-1-solid"}
                />
                <Typography
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                  }}
                >
                  {toVND(total)}
                </Typography>
              </Box>
            </Grid>
          </Grid2>
        </>
      );
    });
  };

  const renderCart = () => {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "1rem",
            height: "17rem",
            overflow: "auto",
          }}
        >
          {cart.products.length > 0 ? (
            <>{renderProductsInCart()}</>
          ) : (
            <>
              <IconifyIcon fontSize={"2.5rem"} icon={"cil:cart"} />
              <Typography fontSize={"0.85rem"}>
                Hiện chưa có sản phẩm
              </Typography>
            </>
          )}
        </Box>
      </>
    );
  };

  return (
    <>
      <CardContent>
        <Typography
          fontSize={"1.3rem"}
          fontWeight={"500"}
          letterSpacing={"1px"}
        >
          Giỏ hàng
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>{renderCart()}</CardContent>
      <Divider />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography fontWeight={"bold"}>Tổng tiền:</Typography>
          <Typography fontWeight={"bold"} color={theme.palette.primary.main}>
            {toVND(totalMoney)}
          </Typography>
        </Box>
      </CardContent>
      <Button
        onClick={() => navigate(ROUTES_CONSTANT.CART_PAGE)}
        variant="contained"
        fullWidth
      >
        Xem giỏ hàng
      </Button>
    </>
  );
};

export default CartDropDownComponent;
