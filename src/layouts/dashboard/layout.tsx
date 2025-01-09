import {
  Alert,
  Box,
  Breakpoint,
  SxProps,
  Theme,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { LayoutSection } from "../core/layout-section";
import { HeaderSection } from "../core/header-section";
import { MenuButton } from "../components/menu-button";
import { NavDesktop, NavMobile } from "./nav";
import { navData } from "../config-nav-dashboard";
import { AccountPopover } from "../components/account-popover";
import { Iconify } from "../../components/iconify/iconify";
import { Main } from "./main";
import { layoutClasses } from "../classes";
import ThemeToggle from "../../components/toggleThemeComponent";

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export const DashboardLayout = ({
  sx,
  children,
  header,
}: DashboardLayoutProps) => {
  const theme = useTheme();

  const [navOpen, setNavOpen] = useState(false);

  const layoutQuery: Breakpoint = "lg";

  return (
    <LayoutSection
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            container: {
              maxWidth: false,
              sx: {
                px: {
                  [layoutQuery]: 5,
                },
              },
            },
          }}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert
                severity="info"
                sx={{
                  display: "none",
                  borderRadius: 0,
                }}
              >
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                <MenuButton
                  onClick={() => setNavOpen(true)}
                  sx={{
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: "none" },
                  }}
                />

                <NavMobile
                  data={navData}
                  open={navOpen}
                  onClose={() => setNavOpen(false)}
                />
              </>
            ),
            rightArea: (
              <Box gap={1} display="flex" alignItems="center">
                <ThemeToggle />
                <AccountPopover
                  data={[
                    {
                      label: "Home",
                      href: "/admin",
                      icon: (
                        <Iconify
                          width={22}
                          icon="solar:home-angle-bold-duotone"
                        />
                      ),
                    },
                  ]}
                />
              </Box>
            ),
          }}
        />
      }
      sidebarSection={<NavDesktop data={navData} layoutQuery={layoutQuery} />}
      footerSection={null}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            pl: "300px",
          },
        },
        ...sx,
      }}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
};
