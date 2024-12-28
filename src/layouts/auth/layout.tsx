import { Alert, Breakpoint, Link, SxProps, Theme } from "@mui/material";
import { LayoutSection } from "../core/layout-section";
import { HeaderSection } from "../core/header-section";
import { Logo } from "../../components/logo";
import { RouterLink } from "../../routes/components/router-link";
import { Main } from "./main";
import { stylesMode } from "../../theme/styles/utils";

export type AuthLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export const AuthLayout = ({ sx, children, header }: AuthLayoutProps) => {
  const layoutQuery: Breakpoint = "md";

  return (
    <LayoutSection
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            container: { maxWidth: false },
            toolbar: {
              sx: {
                bgcolor: "transparent",
                backdropFilter: "unset",
              },
            },
          }}
          sx={{
            position: { [layoutQuery]: "fixed" },
            ...header?.sx,
          }}
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
            leftArea: <Logo />,
            rightArea: (
              <Link
                component={RouterLink}
                href="#"
                color="inherit"
                sx={{
                  typography: "subtitle2",
                }}
              >
                Need help?
              </Link>
            ),
          }}
        />
      }
      sidebarSection={null}
      footerSection={null}
      sx={{
        "&::before": {
          width: 1,
          height: 1,
          zIndex: -1,
          content: "''",
          opacity: 0.24,
          position: "fixed",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundImage: `url(/assets/background/overlay.jpg)`,
          [stylesMode.dark]: {
            opacity: 0.08,
          },
        },
        ...sx,
      }}
    >
      <Main layoutQuery={layoutQuery}>{children}</Main>
    </LayoutSection>
  );
};
