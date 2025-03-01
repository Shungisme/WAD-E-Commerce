import { useRef } from "react";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import SmallCarouselComponent from "./SmallCarousel";
import IconifyIcon from "./iconifyIcon";
import CardComponent from "./CardComponent";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANT } from "../constants/routesConstants";
import { slugify } from "../utils/slugify";

interface TProps {
  items: Array<any>;
  type: string;
}

const SmallCarousel = ({ items, type }: TProps) => {
  const smallCarouselref = useRef<any>(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const renderCarousel = () => {
    return items?.map((item) => {
      return (
        <div
          style={{
            maxWidth: "22rem",
            height: "34rem",
            margin: "0 auto",
          }}
          key={item?._id}
        >
          <CardComponent item={item} />
        </div>
      );
    });
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: "85%",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            width: "100%",
          }}
        >
          <Typography
            fontSize={"2rem"}
            color={theme.palette.primary.main}
            fontWeight={500}
          >
            {type}
          </Typography>
          <Typography
            sx={{
              cursor: "pointer",
            }}
            onClick={() =>
              navigate(
                `/${ROUTES_CONSTANT.FILTER_PAGE}?content=${slugify(type)}`
              )
            }
          >
            Xem tất cả
          </Typography>
        </Box>
        {items?.length > 0 ? (
          <>
            {" "}
            <Box position={"relative"}>
              <SmallCarouselComponent ref={smallCarouselref}>
                {renderCarousel()}
              </SmallCarouselComponent>

              <IconButton
                className="prev-arrow"
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.common.white
                      : theme.palette.common.black,
                  position: "absolute",
                  left: -20,
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
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.common.white
                      : theme.palette.common.black,
                  position: "absolute",
                  right: -20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 1,
                }}
                onClick={() => {
                  smallCarouselref.current.slickNext();
                }}
              >
                <IconifyIcon
                  fontWeight={"bold"}
                  icon={"ooui:next-ltr"}
                  fontSize={"2.5rem"}
                />
              </IconButton>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>Không tồn tại sản phẩm</Typography>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default SmallCarousel;
