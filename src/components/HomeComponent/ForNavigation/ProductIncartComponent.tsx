import { Box, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { slugify } from "../../../utils/slugify";
import { useNavigate } from "react-router-dom";
import IconifyIcon from "../../iconifyIcon";
import { toVND } from "../../../utils/convertNumberToVND";
import { toDiscountPrice } from "../../../utils/toDiscountPrice";
import { memo, useMemo } from "react";
import { useCart } from "../../../hooks/useCart";

interface TProps {
  item: any;
}

const ProductInCartComponent = ({ item }: TProps) => {
  const navigate = useNavigate();
  const quantity = useMemo(() => item.quantity, [item]);
  const price = useMemo(() => toDiscountPrice(item), [item]);
  const total = useMemo(() => quantity * price, [item]);
  const theme = useTheme();
  const { handleChangeQuantity, handleDelete } = useCart();

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
};

export default memo(ProductInCartComponent, (prevProps, nextProps) => {
  return (
    prevProps.item.productId === nextProps.item.productId &&
    prevProps.item.quantity === nextProps.item.quantity
  );
});
