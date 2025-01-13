import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import { PRODUCT } from "../types/productType";
import { toVND } from "../utils/convertNumberToVND";
import { toDiscountPrice } from "../utils/toDiscountPrice";
import { useNavigate } from "react-router-dom";
import { Height } from "@mui/icons-material";

interface TProps {
  item: PRODUCT;
}

const CardComponent = ({ item }: TProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <Card
        sx={{
          cursor: "pointer",
          height: "100%",
          width: "100%",
          boxShadow: 0,
          border: `1.5px solid`,
        }}
        component={"div"}
        onClick={() => navigate(`/detail?content=${item?.slug}`)}
      >
        <Box position={"relative"}>
          <CardMedia
            sx={{
              height: "25rem",
              objectFit:"cover"
            }}
            image={item.thumbnail}
            title={item.title}
          />
          {item.discount !== 0 && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "3.5rem",
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
              WebkitLineClamp: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            mb={2}
            fontSize={"1.1rem"}
            letterSpacing={1.3}
            fontWeight={500}
          >
            {item.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
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
                  {toVND(item.price)}
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
