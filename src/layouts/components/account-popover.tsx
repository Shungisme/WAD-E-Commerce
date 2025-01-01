import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  IconButtonProps,
  MenuItem,
  menuItemClasses,
  MenuList,
  Popover,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "../../hooks/use-router";
import { usePathname } from "../../routes/hooks/use-pathname";
import { useCallback, useState } from "react";
import { _myAccount } from "../../mocks/_data";
import useAuthAdmin from "../../hooks/use-auth-admin";

export type AccountPopoverProps = IconButtonProps & {
  data?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
};

export const AccountPopover = ({
  data = [],
  sx,
  ...other
}: AccountPopoverProps) => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { admin, logoutAdmin } = useAuthAdmin();

  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
    null
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpenPopover(event.currentTarget);
    },
    []
  );

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleClickItem = useCallback(
    (path: string) => {
      handleClosePopover();
      router.push(path);
    },
    [handleClosePopover, router]
  );

  const handleLogout = useCallback(async () => {
    setOpenPopover(null);
    try {
      await logoutAdmin();
      router.replace("/admin/sign-in");
    } catch (error) {
      setOpenSnackbar(true);
    }
  }, [admin, router, logoutAdmin]);

  const handleCloseSnackbar = useCallback(() => {
    setOpenSnackbar(false);
  }, []);

  return (
    <>
      <IconButton
        onClick={handleOpenPopover}
        sx={{
          p: "0px",
          width: 40,
          height: 40,
          background: `conic-gradient(${theme.palette.primary.light},
           ${theme.palette.warning.light},
           ${theme.palette.primary.light})`,
          ...sx,
        }}
        {...other}
      >
        <Avatar
          src={admin?.avatar}
          alt={admin?.name}
          sx={{
            width: 1,
            height: 1,
          }}
        >
          {admin?.name?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              width: 200,
            },
          },
        }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {admin?.name}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
            }}
            noWrap
          >
            {admin?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuList
          disablePadding
          sx={{
            p: 1,
            gap: 0.5,
            display: "flex",
            flexDirection: "column",
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              color: "text.secondary",
              "&:hover": {
                color: "text.primary",
              },
              [`&.${menuItemClasses.selected}`]: {
                color: "text.primary",
                bgcolor: "action.selected",
                fontWeight: "fontWeightSemiBold",
              },
            },
          }}
        >
          {data.map((option) => (
            <MenuItem
              key={option.label}
              selected={option.href === pathname}
              onClick={() => handleClickItem(option.href)}
            >
              {option.icon}
              {option.label}
            </MenuItem>
          ))}
        </MenuList>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box sx={{ p: 1 }}>
          <Button
            fullWidth
            color="error"
            size="medium"
            variant="text"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Popover>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Logout failed"
      />
    </>
  );
};
