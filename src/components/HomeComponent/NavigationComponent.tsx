import {
  Badge,
  Box,
  Button,
  IconButton,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import IconifyIcon from "../iconifyIcon";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMemo, useState } from "react";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import ForgotPasswordComponent from "./ForgotPasswordComponent";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../toggleThemeComponent";
import CarouselComponent from "../CarouselComponent";
import DropdownComponent from "../DropdownComponent";
import { headerContentCarousel } from "../../constants/headerContentCarousel";
import CartDropDownComponent from "./CartDropDownComponent";
import SearchComponent from "./SearchComponent";

const NavigationComponent = () => {
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
  const [value, setValue] = useState(0);
  const [nameComponent, setNameComponent] = useState<string>("login");
  

  const theme = useTheme();
  const navigate = useNavigate();



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

  //function handle Event
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
                color="black"
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
      <Box sx={{ padding: "0.5rem", maxWidth: "90%", margin: "0 auto" }}>
        <Box
          sx={{
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
            <Tabs
              sx={{
                "& button": {
                  textTransform: "capitalize",
                },
                display: "inline-block",
              }}
              value={value}
              onChange={handleChange}
            >
              <Tab label="Trang chủ" />
              <Tab label="Cửa hàng" />
              <Tab label="Hỗ trợ" />
            </Tabs>
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
            
            <SearchComponent/>

            <DropdownComponent
              contentDrop={renderComponentAuthentication()}
              dropdownKey={nameComponent}
            >
              <IconifyIcon icon={"ph:user-light"} fontSize={"1.5rem"} />
              <Typography fontSize={"0.8rem"}>Tài khoản</Typography>
            </DropdownComponent>

            <DropdownComponent
              contentDrop={<CartDropDownComponent/>}
              dropdownKey="cartDropDown"
            >
              <Badge badgeContent={4} color="primary">
                <IconifyIcon icon={"mdi-light:cart"} fontSize={"1.5rem"} />
              </Badge>
              <Typography fontSize={"0.8rem"}>Giỏ hàng</Typography>
            </DropdownComponent>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NavigationComponent;
