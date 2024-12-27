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
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "../../hooks/use-router";
import { usePathname } from "../../routes/hooks/use-pathname";
import { useCallback, useState } from "react";
import { _myAccount } from "../../mocks/_data";

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

  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
    null
  );

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

  return (
    <>
      <IconButton
        onClick={handleOpenPopover}
        sx={{
          p: "2px",
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
          src={_myAccount.photoURL}
          alt={_myAccount.displayName}
          sx={{
            width: 1,
            height: 1,
          }}
        >
          {_myAccount.displayName.charAt(0).toUpperCase()}
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
            {_myAccount?.displayName}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
            }}
            noWrap
          >
            {_myAccount?.email}
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
          <Button fullWidth color="error" size="medium" variant="text">
            Logout
          </Button>
        </Box>
      </Popover>
    </>
  );
};