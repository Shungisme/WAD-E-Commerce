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
import { Logo } from "../../components/logo";
import { Scrollbar } from "../../components/scrollbar";
import { RouterLink } from "../../components/router-link";

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
        bgcolor: "background.paper",
        zIndex: 1101,
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
        [`& ${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: "unset",
          bgcolor: "lightPaperBg",
          width: "320px",
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

  return (
    <>
      <Logo />

      {slots?.topArea}

      <Scrollbar fillContent>
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
                      minHeight: "44px",
                      ...(isActive && {
                        fontWeight: "fontWeightSemiBold",
                        bgcolor: "primary.main",
                        color: "primary.main",
                        "&:hover": {
                          bgcolor: "primary.main",
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
