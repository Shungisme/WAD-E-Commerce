import {
  Badge,
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import IconifyIcon from "../iconifyIcon";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useMemo, useState } from "react";
import LoginComponent from "./ForNavigation/LoginComponent";
import RegisterComponent from "./ForNavigation/RegisterComponent";
import ForgotPasswordComponent from "./ForNavigation/ForgotPasswordComponent";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../toggleThemeComponent";
import CarouselComponent from "../CarouselComponent";
import DropdownComponent from "../DropdownComponent";
import { headerContentCarousel } from "../../constants/headerContentCarousel";
import CartDropDownComponent from "./ForNavigation/CartDropDownComponent";
import SearchComponent from "./ForNavigation/SearchComponent";
import useHover from "../../hooks/useHover";
import MegaMenuDropDownComponent from "./ForNavigation/MegaMenuDropDownComponent";
import { AnimatePresence } from "framer-motion";
import { CATEGORIES_CONTANT } from "../../constants/categoryContants";
import {motion} from 'framer-motion'

const NavigationComponent = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //setting carousel
  const settings = useMemo(() => {
    return {
      dots: false,
      fade: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      waitForAnimate: false,
    };
  }, []);

  //Hooks
  const [nameComponent, setNameComponent] = useState<string>("login");

  const theme = useTheme();
  const navigate = useNavigate();
  const hoverShopTab = useHover();

  //render component
  const renderItemInCarouselHeaderContent = () => {
    return headerContentCarousel().map((item, index) => {
      return (
        <>
          <div
            key={index}
            style={{
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.common.black
                  : theme.palette.common.white,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.common.white
                  : theme.palette.common.black,
              padding: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Typography
                fontWeight={"semibold"}
                fontSize={"12px"}
                display={"inline-block"}
              >
                {item.content}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  height: "27px",
                  width: "15px",
                  textTransform: "capitalize",
                  fontSize: "12px",
                }}
                onClick={() => navigate(item.url)}
              >
                Shop
              </Button>
            </Box>
          </div>
        </>
      );
    });
  };

  const renderComponentAuthentication = () => {
    if (nameComponent === "login") {
      return <LoginComponent navigateToComponent={setNameComponent} />;
    } else if (nameComponent === "register") {
      return <RegisterComponent navigateToComponent={setNameComponent} />;
    } else if (nameComponent === "forgot") {
      return <ForgotPasswordComponent navigateToComponent={setNameComponent} />;
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#ebebeb",
          "&:hover button": {
            opacity: 1,
          },
          mx: "0 auto",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              position: "relative",
            }}
          >
            <CarouselComponent settings={settings}>
              {renderItemInCarouselHeaderContent()}
            </CarouselComponent>

            <IconButton
              className="prev-arrow"
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.common.black
                    : theme.palette.common.white,
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                opacity: 0,
                transition: "opacity 0.3s ease",
              }}
              onClick={() => {
                const prevButton = document.querySelector(
                  ".slick-prev"
                ) as HTMLElement;
                if (prevButton) prevButton.click();
              }}
            >
              <IconifyIcon
                icon={"ooui:next-rtl"}
                fontSize={15}
                fontWeight={"bold"}
              />
            </IconButton>

            <IconButton
              className="next-arrow"
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.common.black
                    : theme.palette.common.white,
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                opacity: 0,
                transition: "opacity 0.3s ease",
              }}
              onClick={() => {
                const nextButton = document.querySelector(
                  ".slick-next"
                ) as HTMLElement;
                if (nextButton) nextButton.click();
              }}
            >
              <IconifyIcon
                fontWeight={"bold"}
                icon={"ooui:next-ltr"}
                fontSize={15}
              />
            </IconButton>
          </div>
        </Box>
      </Box>
      <motion.div
        style={{
          position: isSticky ? "fixed" : "relative", 
          top: isSticky ? 0 : "auto",
          width: "100%",
          zIndex: 1000,
          padding: "0.5rem",
          backgroundColor: theme.palette.common.white,
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <Box
          sx={{
            maxWidth: "90%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <IconButton
              sx={{
                backgroundColor: "rgb(120, 120, 120)",
                "&:hover": {
                  backgroundColor: "rgb(60, 60, 60)",
                },
              }}
            >
              <IconifyIcon
                icon={"cbi:jenkins-logo"}
                fontSize={"2.5rem"}
                color="white"
              />
            </IconButton>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Box
                sx={{
                  display: "block",
                  transition: "all ease-in-out 0.1s",
                  "&::after": {
                    content: '""',
                    display: "block",
                    height: "2px",
                    width: 0,
                    backgroundColor: theme.palette.primary.main,
                    transition: "width 0.5s ease-in-out",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                <Typography
                  sx={{
                    cursor: "pointer",
                    py: 1.5,
                  }}
                >
                  Trang chủ
                </Typography>
              </Box>

              <Box
                ref={hoverShopTab.ref}
                sx={{
                  display: "block",
                  transition: "all ease-in-out 0.1s",
                  "&::after": {
                    content: '""',
                    display: "block",
                    height: "2px",
                    width: 0,
                    backgroundColor: theme.palette.primary.main,
                    transition: "width 0.5s ease-in-out",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                <Typography
                  sx={{
                    cursor: "pointer",
                    py: 1.5,
                  }}
                >
                  Cửa hàng
                </Typography>
                <AnimatePresence>
                  {hoverShopTab.isHover && (
                    <MegaMenuDropDownComponent content={CATEGORIES_CONTANT()} />
                  )}
                </AnimatePresence>
              </Box>

              <Box
                sx={{
                  display: "block",
                  transition: "all ease-in-out 0.1s",
                  "&::after": {
                    content: '""',
                    display: "block",
                    height: "2px",
                    width: 0,
                    backgroundColor: theme.palette.primary.main,
                    transition: "width 0.5s ease-in-out",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                <Typography
                  sx={{
                    cursor: "pointer",
                    py: 1.5,
                  }}
                >
                  Hỗ trợ
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Box>
              <ThemeToggle />
            </Box>

            <SearchComponent />

            <DropdownComponent
              contentDrop={renderComponentAuthentication()}
              dropdownKey={nameComponent}
            >
              <IconifyIcon icon={"ph:user-light"} fontSize={"1.5rem"} />
              <Typography fontSize={"0.8rem"}>Tài khoản</Typography>
            </DropdownComponent>

            <DropdownComponent
              contentDrop={<CartDropDownComponent />}
              dropdownKey="cartDropDown"
            >
              <Badge badgeContent={4} color="primary">
                <IconifyIcon icon={"mdi-light:cart"} fontSize={"1.5rem"} />
              </Badge>
              <Typography fontSize={"0.8rem"}>Giỏ hàng</Typography>
            </DropdownComponent>
          </Box>
        </Box>
      </motion.div>
    </>
  );
};

export default NavigationComponent;
