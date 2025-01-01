import { Box, Button, Typography, useTheme } from "@mui/material";
import { toDiscountPrice } from "../../utils/toDiscountPrice";
import { toVND } from "../../utils/convertNumberToVND";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { useSearchParams } from "react-router-dom";
import {
  getCartInLocalStorage,
} from "../../utils/localStorage";
import { PRODUCT } from "../../types/productType";
import { useCart } from "../../hooks/useCart";

interface TProps {
  item: any;
}

const DetailProductComponent = ({ item }: TProps) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const { addCart } = useCart();

  const handleAddProductToCart = async () => {
    const detailProduct: any = queryClient.getQueryData([
      "detail-product",
      searchParams.get("content"),
    ]);
    let data;
    if (!user) {
      const cart = getCartInLocalStorage();
      const index = cart?.findIndex(
        (item: PRODUCT) => item?.productId === detailProduct?._id
      );
      if (index === -1) {
        const tmp = {
          discount: detailProduct?.discount,
          price: detailProduct?.price,
          productId: detailProduct?._id,
          quantity: 1,
          thumbnail: detailProduct?.thumbnail,
          title: detailProduct?.title,
        };
        data = [...cart,tmp]
      
      } else {
        if (cart[index]) {
          cart[index].quantity++;
        }
        data = JSON.parse(JSON.stringify(cart));
      
      }
    } else {
      const cart: any = queryClient.getQueryData(["get-cart", user?._id]);
      data = cart?.products;
      const index = data?.findIndex(
        (item: any) => item?.productId === detailProduct?._id
      );
      if (index !== -1) {
        data[index].quantity = data[index].quantity + 1;
      } else {
        data.push({
          productId: detailProduct?._id,
          quantity: 1,
        });
      }
    }
   
    await addCart?.mutate({ userId: user?._id || "", products: [...data] });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "50%",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: 400,
          }}
        >
          {item?.title}
        </Typography>
        {item?.discount > 0 ? (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                {toVND(toDiscountPrice(item))}
              </Typography>
              <Typography
                sx={{
                  textDecoration: "line-through",
                }}
              >
                {toVND(item?.price)}
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <Typography>{toVND(toDiscountPrice(item))}</Typography>
          </>
        )}
        <Typography>
          Loại hàng: <strong>{item?.categoryTitle}</strong>
        </Typography>
        <Typography>{item?.description}</Typography>
        <Button onClick={() => handleAddProductToCart()} variant="contained">
          Thêm vào giỏ hàng
        </Button>
      </Box>
    </>
  );
};

export default DetailProductComponent;
