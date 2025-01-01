import { Box, IconButton, useTheme } from "@mui/material";
import CarouselComponent from "../../CarouselComponent";
import { CAROUSEL_MAIN } from "../../../constants/carouselContants";
import { useNavigate } from "react-router-dom";
import IconifyIcon from "../../iconifyIcon";
import { useRef } from "react";

interface CarouselSettings {
  dots: boolean;
  fade: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  waitForAnimate: boolean;
  autoplay: boolean;
  autoplaySpeed: number;
  appendDots: (dots: React.ReactNode) => React.ReactElement;
  customPaging?: (dots: React.ReactNode) => React.ReactElement;
}

const settings: CarouselSettings = {
  dots: true,
  fade: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  waitForAnimate: false,
  autoplay: true,
  autoplaySpeed: 2000,
  appendDots: (dots) => (
    <div
      style={{
        borderRadius: "10px",
        padding: "10px",
        bottom: "0",
      }}
    >
      <ul> {dots} </ul>
    </div>
  ),
};

const MainCarousel = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const sliderRef = useRef<any>(null);

  const renderCarouselMain = () => {
    return CAROUSEL_MAIN().map((item, index) => {
      return (
        <div>
          <Box
            key={"MainCarousel" + index}
            onClick={() => navigate(item.link)}
            className="cursor-pointer relative w-screen h-[42rem]"
          >
            <img
              src={item.image}
              alt={item.link}
              className="w-full h-full object-cover"
            />
          </Box>
        </div>
      );
    });
  };

  return (
    <Box
      sx={{
        maxWidth: "98.9vw",
        position: "relative",
        "&:hover .prev-arrow, &:hover .next-arrow": {
          opacity: 1,
        },
      }}
    >
      <CarouselComponent ref={sliderRef} settings={settings}>
        {renderCarouselMain()}
      </CarouselComponent>
      <IconButton
        className="prev-arrow"
        sx={{
          color: theme.palette.common.white,
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
        onClick={() => {
          sliderRef.current?.slickPrev();
        }}
      >
        <IconifyIcon icon={"ooui:next-rtl"} fontSize={40} fontWeight={"bold"} />
      </IconButton>

      <IconButton
        className="next-arrow"
        sx={{
          color: theme.palette.common.white,
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
        onClick={() => {
          sliderRef.current?.slickNext();
        }}
      >
        <IconifyIcon fontSize={40} fontWeight={"bold"} icon={"ooui:next-ltr"} />
      </IconButton>
    </Box>
  );
};

export default MainCarousel;
