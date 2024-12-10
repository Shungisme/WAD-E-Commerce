import { Box, Button, Typography, useTheme } from "@mui/material";
import { PRODUCT } from "../../types/productType";
import { toDiscountPrice } from "../../utils/toDiscountPrice";
import { toVND } from "../../utils/convertNumberToVND";

interface TProps {
  item: PRODUCT;
}

const DetailProductComponent = ({ item }: TProps) => {
 const theme = useTheme();
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
          {item.name}
        </Typography>
        {item.discount > 0 ? (
          <>
            <Box sx={{
                display:"flex",
                alignItems:"center",
                gap: 2
            }}>
              <Typography sx={{
                color: theme.palette.primary.main,
                fontWeight:"bold",
                fontSize:"1.5rem"
              }}>{toVND(toDiscountPrice(item))}</Typography>
              <Typography sx={{
              textDecoration: "line-through"}}>{toVND(item.price)}</Typography>
            </Box>
          </>
        ) : (
          <>
            <Typography>{toVND(toDiscountPrice(item))}</Typography>
          </>
        )}
        <Typography>Category: <strong>{item.category}</strong></Typography>
        <Typography>{item.description}</Typography>
        <Button variant="contained">Thêm vào giỏi hàng</Button>
      </Box>
    </>
  );
};

export default DetailProductComponent;
