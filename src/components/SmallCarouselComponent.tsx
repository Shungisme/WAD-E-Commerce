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
import CardComponent from "./CardComponent";

interface TProps {
  items: Array<any>;
  type: string;
}

const SmallCarousel = ({ items, type }: TProps) => {
  const smallCarouselref = useRef<any>(null);
  const theme = useTheme();

  const renderCarousel = () => {
    return items.map((item, index) => {
      return (
        <>
          <CardComponent item={item} key={index}/>
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
