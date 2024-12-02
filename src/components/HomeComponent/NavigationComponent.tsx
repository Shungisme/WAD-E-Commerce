import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import IconifyIcon from "../IconifyIcon";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMemo, useRef, useState } from "react";
import LoginComponent from "./LoginComponent";
import useClickOutSide from "../../hooks/useClickOutSide";
import RegisterComponent from "./RegisterComponent";
import ForgotPasswordComponent from "./ForgotPasswordComponent";
import { motion } from "framer-motion";

const NavigationComponent = () => {
  const settings = useMemo(() => {
    return {
      dots: false,
      fade: true,
      infinite: true,
      speed: 300,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      waitForAnimate: false,
    };
  }, []);

  const [value, setValue] = useState(0);
  const [nameComponent, setNameComponent] = useState<string>("login");
  const [clickUserDropDown, setClickUserDropDown] = useState<boolean>(false);
  const clickUserRef = useRef<HTMLDivElement | null>(null);
  useClickOutSide({
    elementRef: clickUserRef,
    callback: () => setClickUserDropDown(false),
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderComponentInCard = () => {
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
        }}
      >
        <Container
          maxWidth={"xl"}
          sx={{
            mx: "0 auto",
            textAlign: "center",
            padding: 1,
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
              <Slider {...settings} className="text-[13px] font-semibold">
                <div>
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
                      Miễn phí vận chuyển với đơn hàng từ 500K
                    </Typography>
                    <Button
                      sx={{
                        color: "white",
                        backgroundColor: "#ffc107",
                        height: "27px",
                        width: "15px",
                        textTransform: "capitalize",
                        fontSize: "12px",
                      }}
                    >
                      Shop
                    </Button>
                  </Box>
                </div>
                <div>
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
                      Ra mắt sản phẩm mới MIDITADI chỉ 650K
                    </Typography>
                    <Button
                      sx={{
                        color: "white",
                        backgroundColor: "#ffc107",
                        height: "27px",
                        width: "15px",
                        textTransform: "capitalize",
                        fontSize: "12px",
                      }}
                    >
                      Shop
                    </Button>
                  </Box>
                </div>
                <div>
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
                      Pre-order Snap Classic 2 chỉ với 500K
                    </Typography>
                    <Button
                      sx={{
                        color: "white",
                        backgroundColor: "#ffc107",
                        height: "25px",
                        width: "15px",
                        textTransform: "capitalize",
                        fontSize: "12px",
                      }}
                    >
                      Shop
                    </Button>
                  </Box>
                </div>
              </Slider>

              <IconButton
                className="prev-arrow"
                sx={{
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
                  color="black"
                  fontWeight={"bold"}
                  icon={"ooui:next-ltr"}
                  fontSize={15}
                />
              </IconButton>
            </div>
          </Box>
        </Container>
      </Box>
      <Box sx={{ padding: "0.5rem", maxWidth: "90%", margin: "0 auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
                color: "black",
                fontSize: "1rem",
                letterSpacing: "2px",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "black",
              },
            }}
            value={value}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab label="Trang chủ" />
            <Tab label="Cửa hàng" />
            <Tab label="Hỗ trợ" />
          </Tabs>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <IconifyIcon
                icon={"material-symbols-light:search"}
                fontSize={"1.5rem"}
              />
              <Typography fontSize={"0.8rem"}>Tìm kiếm</Typography>
            </Box>
            <Box sx={{ position: "relative" }} ref={clickUserRef}>
              <Box
                onClick={() => {
                  setClickUserDropDown(!clickUserDropDown);
                }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                className="peer"
              >
                <IconifyIcon icon={"ph:user-light"} fontSize={"1.5rem"} />
                <Typography fontSize={"0.8rem"}>Tài khoản</Typography>
              </Box>
              <Card
                style={{
                  visibility: clickUserDropDown ? "visible" : "hidden",
                  opacity: clickUserDropDown ? 1 : 0,
                  transform: clickUserDropDown ? "scale(1)" : "scale(0.9)",
                  transition:
                    "opacity 200ms ease-out, transform 300ms ease-in-out",
                  zIndex: clickUserDropDown ? 2 : -9999,
                }}
                sx={{
                  position: "absolute",
                  right: 0,
                  mt: 1,
                  padding: "1rem 0.5rem",
                  width: "20rem",
                  textAlign: "center",
                  overflow: "visible",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "-10px",
                    right: "20px",
                    width: 0,
                    height: 0,
                    borderLeft: "10px solid transparent",
                    borderRight: "10px solid transparent",
                    borderBottom: "10px solid white",
                  },
                }}
              >
                <motion.div
                  key={nameComponent}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                >
                  {renderComponentInCard()}
                </motion.div>
              </Card>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Badge badgeContent={4} color="primary">
                <IconifyIcon icon={"mdi-light:cart"} fontSize={"1.5rem"} />
              </Badge>
              <Typography fontSize={"0.8rem"}>Giỏ hàng</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NavigationComponent;
