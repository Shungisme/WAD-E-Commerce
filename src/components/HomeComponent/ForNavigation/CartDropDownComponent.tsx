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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANT } from "../../../constants/routesConstants";
import { toDiscountPrice } from "../../../utils/toDiscountPrice";
import { toVND } from "../../../utils/convertNumberToVND";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import { getProductInCartById, updateCart } from "../../../services/cart";
import { totalPrice } from "../../../utils/totalPrice";
import { slugify } from "../../../utils/slugify";

interface TProps {
  setData: React.Dispatch<any>;
}

const CartDropDownComponent = ({ setData }: TProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [totalMoney,setTotalMoney] = useState<number>(0);
  const theme = useTheme();
  const navigate = useNavigate();

  const myCart = useQuery({
    queryKey: ["get-cart", user?._id],
    queryFn: async () => {
      const response = await getProductInCartById(String(user?._id));
      setData(response.cart);
      setTotalMoney(totalPrice(response?.cart?.products))
      return response?.cart;
    },
    enabled: !!user?._id,
  });



  const changeDataInCart = useMutation({
    mutationKey: ["change-quantity"],
    mutationFn: async ({
      userId,
      products,
    }: {
      userId: string;
      products?: any;
    }) => {
      const response = await updateCart(userId, products);
      return response;
    },
    onMutate: ({ userId, products }) => {
      queryClient.cancelQueries({ queryKey: ["get-cart", user?._id] });
      const previousData = queryClient.getQueryData(["get-cart", user?._id]);

      queryClient.setQueryData(["get-cart", user?._id], (old: any) => {
        const data = old?.cart;
        const newObject = { ...data };
        newObject.products = [...products];

        setTotalMoney(totalPrice(newObject?.products))
        return newObject;
      });

      return { previousData };
    },
    onError: async (error, { userId, products }, context:any) => {
      await queryClient.setQueryData(["get-cart", user?._id], context?.previousData);
      setTotalMoney(totalPrice(context?.previousData?.cart?.products))
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ["get-cart", user?._id] });
    },
  });

  const handleChangeQuantity = async (productItem: any, status: string) => {
    const cart: any = queryClient.getQueryData(["get-cart", user?._id]);
    const data = cart?.products;

    const index = data?.findIndex(
      (item: any) => item.productId === productItem?.productId
    );

    if (index === -1) return;

    const newProducts = [...data];

    if (status === "inscrese") {
      newProducts[index].quantity++;
    } else if (status === "descrease") {
      if(newProducts[index].quantity === 1) return;
      newProducts[index].quantity--;
    }

    await changeDataInCart.mutate({
      userId: user?._id || "",
      products: newProducts,
    });
  };

  const handleDelete = async (productItem: any) => {
    const cart: any = queryClient.getQueryData(["get-cart", user?._id]);
    const data = cart?.products;

    const index = data?.findIndex(
      (item: any) => item.productId === productItem?.productId
    );

    if (index === -1) return;


    const newProducts = data.filter((item:any) => item?.productId !== productItem?.productId);

    await changeDataInCart.mutate({
      userId: user?._id || "",
      products: newProducts,
    });
  };

  const renderProductsInCart = () => {
    return myCart?.data?.products?.map((item: any, index: any) => {
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
            key={index}
          >
            <Grid item xs={3}>
              <Box sx={{
                display:"flex",
                alignItems:"center",
                height:"100%"
              }}>
                <Box
                  onClick={() => navigate(`/detail?content=${slugify(item?.title)}`)}
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
                    width:"100%",
                  }}
                >
                  <IconButton
                    onClick={() => handleChangeQuantity(item, "descrease")}
                  >
                    <IconifyIcon icon={"tabler:minus"} />
                  </IconButton>
                  <input
                    type="text"
                    className="text-black outline-none w-6 h-6 text-center border border-gray-300 rounded"
                    disabled
                    value={item?.quantity}
                  />
                  <IconButton
                    onClick={() => handleChangeQuantity(item, "inscrese")}
                  >
                    <IconifyIcon icon={"mynaui:plus"} />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={1}  height={"100%"}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent:"space-between",
                  height:"88%"
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
            height: "17rem",
            overflow: "auto",
          }}
        >
          {user && myCart?.data?.products?.length > 0 ? (
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
