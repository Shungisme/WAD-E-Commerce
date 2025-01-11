import {
  Box,
  Breakpoint,
  Drawer,
  drawerClasses,
  ListItem,
  ListItemButton,
  SxProps,
  Theme,
  useTheme,
} from "@mui/material";
import { usePathname } from "../../routes/hooks/use-pathname";
import { useEffect } from "react";
import { Logo } from "../../components/logo/logo";
import { Scrollbar } from "../../components/scrollbar/scrollbar";
import { RouterLink } from "../../routes/components/router-link";
import { varAlpha } from "../../theme/styles/utils";
import { useTheme as getTheme } from "../../hooks/useTheme";

export type NavContentProps = {
  data: {
    path: string;
    title: string;
    icon: React.ReactNode;
    info?: React.ReactNode;
  }[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  sx?: SxProps<Theme>;
};

export const NavDesktop = ({
  sx,
  data,
  slots,
  layoutQuery,
}: NavContentProps & { layoutQuery: Breakpoint }) => {
  const theme = useTheme();
  const { mode, toggleMode } = getTheme();

  return (
    <Box
      sx={{
        pt: 2.5,
        px: 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: "none",
        position: "fixed",
        flexDirection: "column",
        bgcolor:
          mode === "light"
            ? theme.palette.common.white
            : theme.palette.common.black,
        zIndex: 1101,
        width: 300,
        [theme.breakpoints.up(layoutQuery)]: {
          display: "flex",
        },
        ...sx,
      }}
    >
      <NavContent data={data} slots={slots} />
    </Box>
  );
};

export const NavMobile = ({
  sx,
  data,
  open,
  slots,
  onClose,
}: NavContentProps & {
  open: boolean;
  onClose: () => void;
}) => {
  const pathname = usePathname();
  const { mode, toggleMode } = getTheme();

  useEffect(() => {
    if (open) {
      onClose();
    }
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: "unset",
          bgcolor: mode === "light" ? "common.white" : "common.black",
          width: 320,
          ...sx,
        },
      }}
    >
      <NavContent data={data} slots={slots} />
    </Drawer>
  );
};

export const NavContent = ({ data, slots, sx }: NavContentProps) => {
  const pathname = usePathname();

  const theme = useTheme();

  return (
    <>
      <Logo />

      {slots?.topArea}

      <Scrollbar fillContent sx={{ my: 2 }}>
        <Box
          component="nav"
          display="flex"
          flex="1 1 auto"
          flexDirection="column"
          sx={sx}
        >
          <Box component="ul" gap={0.5} display="flex" flexDirection="column">
            {data.map((item) => {
              const isActive = item.path === pathname;

              return (
                <ListItem disableGutters disablePadding key={item.title}>
                  <ListItemButton
                    disableGutters
                    component={RouterLink}
                    href={item.path}
                    sx={{
                      pl: 2,
                      py: 1,
                      gap: 2,
                      pr: 1.5,
                      borderRadius: 0.75,
                      typography: "body2",
                      fontWeight: "fontWeightMedium",
                      color: "text.secondary",
                      minHeight: 44,
                      ...(isActive && {
                        fontWeight: "fontWeightSemiBold",
                        bgcolor: varAlpha(
                          theme.palette.primary.mainChannel,
                          0.08
                        ),
                        color: "primary.main",
                        "&:hover": {
                          bgcolor: varAlpha(
                            theme.palette.primary.mainChannel,
                            0.16
                          ),
                        },
                      }),
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        width: 24,
                        height: 24,
                      }}
                    >
                      {item.icon}
                    </Box>

                    <Box component="span" flexGrow={1}>
                      {item.title}
                    </Box>

                    {item.info && item.info}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </Box>
        </Box>
      </Scrollbar>

      {slots?.bottomArea}
    </>
  );
};
