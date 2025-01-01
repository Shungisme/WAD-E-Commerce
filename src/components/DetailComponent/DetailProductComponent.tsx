import { Box, Button, Typography, useTheme } from "@mui/material";
import { toDiscountPrice } from "../../utils/toDiscountPrice";
import { toVND } from "../../utils/convertNumberToVND";
import { useCart } from "../../hooks/useCart";

interface TProps {
  item: any;
}

const DetailProductComponent = ({ item }: TProps) => {
  const theme = useTheme();
  const { handleAddProductToCart } = useCart();

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
