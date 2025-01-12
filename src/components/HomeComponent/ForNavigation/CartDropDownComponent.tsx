import {
  Box,
  Button,
  CardContent,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import IconifyIcon from "../../iconifyIcon";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANT } from "../../../constants/routesConstants";
import { toVND } from "../../../utils/convertNumberToVND";
import { useCart } from "../../../hooks/useCart";
import ProductInCartComponent from "./ProductIncartComponent";

const CartDropDownComponent = () => {
  const { myCart, totalMoney } = useCart();
  const theme = useTheme();
  const navigate = useNavigate();

  const renderProductsInCart = () => {
    return myCart?.data?.products?.map((item: any) => {
      return (
        <>
          <ProductInCartComponent key={item?.productId} item={item} />
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
            maxHeight: "17rem",
            overflow: "auto",
          }}
        >
          {myCart?.data?.products?.length > 0 ? (
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
        onClick={() => navigate(`/${ROUTES_CONSTANT.CART_PAGE}`)}
        variant="contained"
        fullWidth
      >
        Xem giỏ hàng
      </Button>
    </>
  );
};

export default CartDropDownComponent;
