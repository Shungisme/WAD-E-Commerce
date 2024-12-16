import { Box, Card, CardContent, CardMedia, Typography, useTheme } from "@mui/material";
import { PRODUCT } from "../types/productType";
import { toVND } from "../utils/convertNumberToVND";
import { toDiscountPrice } from "../utils/toDiscountPrice";

interface TProps {
  item: PRODUCT;
}

const CardComponent = ({ item }: TProps) => {
    const theme = useTheme();

  return (
    <>
      <Card
        sx={{
          mx: 3,
          cursor: "pointer",
          height:"100%",
          width:"100%"
        }}
      >
        <Box position={"relative"}>
          <CardMedia
            component={"img"}
            height={"2rem"}
            image={item.thumbnail}
            alt={item.name}
            sx={{
              objectFit: "cover",
            }}
          />
          {item.discount !== 0 && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "3.5rem",
                height: "2rem",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
                borderRadius: "0 0 18px 18px",
                textAlign: "center",
              }}
            >
              {item.discount}%
            </Box>
          )}
        </Box>
        <CardContent>
          <Typography
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            mb={2}
            fontSize={"1.2rem"}
            letterSpacing={1.3}
            fontWeight={500}
          >
            {item.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <Typography fontWeight={"bold"} color={theme.palette.primary.main}>
              {toVND(toDiscountPrice(item))}
            </Typography>
            {item.discount !== 0 && (
              <>
                <Typography
                  sx={{
                    textDecoration: "line-through",
                  }}
                >
                  {item.price}
                </Typography>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default CardComponent;
