import { Box, Button, Typography, useTheme } from "@mui/material";
import { toDiscountPrice } from "../../utils/toDiscountPrice";
import { toVND } from "../../utils/convertNumberToVND";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCart } from "../../services/cart";
import { useAuth } from "../../hooks/useAuth";
import AnnouceModalComponent from "../AnnouceModalComponent";
import { useState } from "react";

interface TProps {
  item: any;
}

const DetailProductComponent = ({ item }: TProps) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const addCart = useMutation({
    mutationKey: ["get-cart",user?._id],
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
    onMutate: ({ products }) => {
      queryClient.cancelQueries({ queryKey: ["add-cart"] });
      const previousData = queryClient.getQueryData(["get-cart"]);

      queryClient.setQueryData(["get-cart"], (old: any) => {
        const data = old?.cart;
        const newObject = { ...data };
        newObject.products = [...products];
        return newObject;
      });

      return {previousData};
    },
    onError: (error, { userId, products }, context: any) => {
      queryClient.setQueryData(["get-cart"], context?.previousData);
    },
    onSettled: async () => {
      queryClient.refetchQueries({
        queryKey: ["get-cart", user?._id],
      });
    },
  });

  const handleAddProductToCart = async () => {
    if (!user) {
      setOpenModal(true);
      return;
    }
    const cart: any = queryClient.getQueryData(["get-cart", user?._id]);
    const data = cart?.products;
    const detailProduct: any = queryClient.getQueryData(["detail-product"]);
    const index = data?.findIndex(
      (item: any) => item?.productId === detailProduct?._id
    );
    if (index !== -1) {
      data[index].quantity = data[index].quantity + 1;
    } else {
      data.push({
        productId: detailProduct._id,
        quantity: 1,
      });
    }
    await addCart.mutate({ userId: user?._id || "", products: [...data] });
  };

  return (
    <>
      <AnnouceModalComponent
        header="Thông báo"
        bodyContent="Vui lòng đăng nhập"
        open={openModal}
        setOpen={setOpenModal}
        doCancel={() => setOpenModal(false)}
        doOk={() => setOpenModal(false)}
      />
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
