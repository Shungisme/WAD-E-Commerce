import {
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import IconifyIcon from "../../iconifyIcon";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANT } from "../../../constants/routesConstants";
import { toDiscountPrice } from "../../../utils/toDiscountPrice";
import { toVND } from "../../../utils/convertNumberToVND";
import { slugify } from "../../../utils/slugify";
import { useCart } from "../../../hooks/useCart";



const CartDropDownComponent = () => {
  const { myCart, handleChangeQuantity, handleDelete ,totalMoney} = useCart();
  const theme = useTheme();
  const navigate = useNavigate();


  const renderProductsInCart = () => {
    return myCart?.data?.products?.map((item: any) => {
      const quantity = item.quantity;
      const price = toDiscountPrice(item);
      const total = quantity * price;
      return (
        <>
          <Grid
            width={"100%"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            container
            key={item?.productId}
          >
            <Grid item xs={3}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Box
                  onClick={() =>
                    navigate(`/detail?content=${slugify(item?.title)}`)
                  }
                  sx={{
                    width: "100%",
                    height: "5rem",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  component={"img"}
                  src={item?.thumbnail}
                />
              </Box>
            </Grid>

            <Grid item xs={7} width={"100%"} height={"100%"}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 1,
                  ml: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    textAlign: "left",
                    display: "-webkit-box",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }}
                  fontWeight={500}
                >
                  {item?.title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <IconButton
                    onClick={() => handleChangeQuantity(item, "descrease")}
                  >
                    <IconifyIcon icon={"tabler:minus"} />
                  </IconButton>
                  <input
                    type="text"
                    className="outline-none w-6 h-6 text-center border border-gray-300 rounded"
                    disabled
                    value={item?.quantity}
                    color={theme.palette.text.primary}
                  />
                  <IconButton
                    onClick={() => handleChangeQuantity(item, "inscrese")}
                  >
                    <IconifyIcon icon={"mynaui:plus"} />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={1} height={"100%"}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  height: "88%",
                }}
              >
                <IconifyIcon
                  onClick={() => handleDelete(item)}
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
          </Grid>
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
