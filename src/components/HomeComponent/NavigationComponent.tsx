import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import IconifyIcon from "../iconifyIcon";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import LoginComponent from "./ForNavigation/LoginComponent";
import RegisterComponent from "./ForNavigation/RegisterComponent";
import ForgotPasswordComponent from "./ForNavigation/ForgotPasswordComponent";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../toggleThemeComponent";
import DropdownComponent from "../DropdownComponent";
import CartDropDownComponent from "./ForNavigation/CartDropDownComponent";
import SearchComponent from "./ForNavigation/SearchComponent";
import useHover from "../../hooks/useHover";
import MegaMenuDropDownComponent from "./ForNavigation/MegaMenuDropDownComponent";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { ROUTES_CONSTANT } from "../../constants/routesConstants";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import SpinnerFullScreen from "../SpinnerFullScreen";
import { getAllCategories } from "../../services/categories";
import { useCart } from "../../hooks/useCart";
import ModalComponent from "../ModalComponent";
import UpdateProfileComponent from "./ForNavigation/UpdateProfileComponent";
import ChangePasswordComponent from "./ForNavigation/ChangePasswordComponent";

const NavigationComponent = () => {
  const [isSticky, setIsSticky] = useState(false);
  const { user, logoutAuth } = useAuth();
  const { myCart } = useCart();
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);

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

  const [nameComponent, setNameComponent] = useState<string>("login");

  const theme = useTheme();
  const navigate = useNavigate();
  const hoverShopTab = useHover();

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 5 * 60 * 1000,
  });

  const renderComponentAuthentication = () => {
    if (nameComponent === "login") {
      return <LoginComponent navigateToComponent={setNameComponent} />;
    } else if (nameComponent === "register") {
      return <RegisterComponent navigateToComponent={setNameComponent} />;
    } else if (nameComponent === "forgot") {
      return <ForgotPasswordComponent navigateToComponent={setNameComponent} />;
    }
  };

  const renderHasLogin = () => {
    return (
      <>
        <Stack direction={"column"} gap={2}>
          <Typography fontWeight={500} fontSize={"1.4rem"}>
            Thông tin cá nhân
          </Typography>
          <Divider />
          <Box textAlign={"left"} ml={2.5}>
            <Typography>
              <strong>Email: </strong> {user?.email}
            </Typography>
            <Typography>
              <strong>Name: </strong> {user?.name}
            </Typography>
          </Box>
          <Stack>
            <Button onClick={() => setOpenModalUpdate(true)}>
              Cập nhật thông tin
            </Button>
            <Button onClick={() => setOpenChangePassword(true)}>
              Đổi mật khẩu
            </Button>
          </Stack>
          <Divider />
          <Button
            onClick={async () => {
              await logoutAuth();
            }}
            variant="contained"
            fullWidth
          >
            Đăng xuất
          </Button>
        </Stack>
      </>
    );
  };

  return (
    <>
      {categories.isFetching && <SpinnerFullScreen />}
      <ModalComponent open={openModalUpdate} setOpen={setOpenModalUpdate}>
        <UpdateProfileComponent />
      </ModalComponent>
      <ModalComponent open={openChangePassword} setOpen={setOpenChangePassword}>
        <ChangePasswordComponent setOpenParent={setOpenChangePassword} />
      </ModalComponent>
      <Box>
        <motion.div
          style={{
            position: isSticky ? "fixed" : "relative",
            top: isSticky ? 0 : "auto",
            width: "100%",
            zIndex: 1000,
            padding: "0.5rem",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            backgroundColor: theme.palette.background.default,
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
              <Avatar
                sx={{
                  cursor: "pointer",
                  width: "3rem",
                  height: "3rem",
                }}
                onClick={() => navigate(ROUTES_CONSTANT.HOME_PAGE)}
                src={`/TTHP.png`}
              />

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
                    component={"div"}
                    onClick={() => navigate(ROUTES_CONSTANT.HOME_PAGE)}
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
                    component={"div"}
                    onClick={() => navigate(`/${ROUTES_CONSTANT.FILTER_PAGE}`)}
                  >
                    Cửa hàng
                  </Typography>
                  <AnimatePresence>
                    {hoverShopTab.isHover && (
                      <MegaMenuDropDownComponent content={categories.data} />
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
                ></Box>
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
                contentDrop={<CartDropDownComponent />}
                dropdownKey="cartDropDown"
              >
                <Badge
                  badgeContent={myCart?.data?.products?.length}
                  color="primary"
                >
                  <IconifyIcon icon={"mdi-light:cart"} fontSize={"1.5rem"} />
                </Badge>
                <Typography fontSize={"0.8rem"}>Giỏ hàng</Typography>
              </DropdownComponent>

              {user ? (
                <>
                  <DropdownComponent
                    contentDrop={renderHasLogin()}
                    dropdownKey={nameComponent}
                  >
                    <Avatar
                      sx={{
                        width: "2.3rem",
                        height: "2.3rem",
                      }}
                      alt={user?.name ?? "Anonymous"}
                      src={user?.avatar ?? undefined}
                    />
                  </DropdownComponent>
                </>
              ) : (
                <>
                  <DropdownComponent
                    contentDrop={renderComponentAuthentication()}
                    dropdownKey={nameComponent}
                  >
                    <Avatar
                      sx={{
                        width: "2.3rem",
                        height: "2.3rem",
                      }}
                      alt={"Anonymous"}
                      src={undefined}
                    />
                  </DropdownComponent>
                </>
              )}
            </Box>
          </Box>
        </motion.div>
      </Box>
    </>
  );
};

export default NavigationComponent;
