import { useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import { toVND } from "../utils/convertNumberToVND";
import SmallCarouselComponent from "./SmallCarousel";
import IconifyIcon from "./iconifyIcon";
import { toDiscountPrice } from "../utils/toDiscountPrice";

interface TProps {
  items: Array<any>;
  type: string;
}

const SmallCarousel = ({ items, type }: TProps) => {
  const smallCarouselref = useRef<any>(null);
  const theme = useTheme();

  const renderCarousel = () => {
    return items.map((item, index) => {
      const currency = toDiscountPrice(item);
      return (
        <>
          <Card
            key={index}
            sx={{
              height: "29rem",
              mx: 3,
              cursor: "pointer",
            }}
          >
            <Box position={"relative"}>
              <CardMedia
                component={"img"}
                height={"4.5rem"}
                image={item.thumbnail}
                alt={item.title}
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
                {item.title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <Typography fontWeight={"bold"} color={theme.palette.primary.main}>
                  {toVND(currency)}
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
    });
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: "80%",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            fontSize={"2rem"}
            color={theme.palette.primary.main}
            fontWeight={500}
          >
            {type}
          </Typography>
          <Typography sx={{
            cursor:"pointer"
          }}>Xem tất cả</Typography>
        </Box>

        <Box position={"relative"}>
          <SmallCarouselComponent ref={smallCarouselref}>
            {renderCarousel()}
          </SmallCarouselComponent>

          <IconButton
            className="prev-arrow"
            sx={{
              color: theme.palette.mode === "dark" ? theme.palette.common.white : theme.palette.common.black,
              position: "absolute",
              left: -30,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
            }}
            onClick={() => {
              smallCarouselref.current.slickPrev();
            }}
          >
            <IconifyIcon
              icon={"ooui:next-rtl"}
              fontSize={"2.5rem"}
              fontWeight={"bold"}
            />
          </IconButton>

          <IconButton
            className="next-arrow"
            sx={{
              color: theme.palette.mode === "dark" ? theme.palette.common.white : theme.palette.common.black,
              position: "absolute",
              right: -30,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
            }}
            onClick={() => {
              smallCarouselref.current.slickNext()
            }}
          >
            <IconifyIcon
              fontWeight={"bold"}
              icon={"ooui:next-ltr"}
              fontSize={"2.5rem"}
            />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default SmallCarousel;
