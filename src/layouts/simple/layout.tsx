import { Alert, Breakpoint, Link, SxProps, Theme } from "@mui/material";
import { LayoutSection } from "../core/layout-section";
import { HeaderSection } from "../core/header-section";
import { Logo } from "../../components/logo/logo";
import { RouterLink } from "../../routes/components/router-link";
import { CompactContent, Main } from "./main";

export type SimpleLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
  content?: {
    compact?: boolean;
  };
};

export const SimpleLayout = ({
  sx,
  children,
  header,
  content,
}: SimpleLayoutProps) => {
  const layoutQuery: Breakpoint = "md";

  return (
    <LayoutSection
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            // toolbar: {
            //   sx: {
            //     bgcolor: "transparent",
            //     backdropFilter: "unset",
            //   },
            // },
            container: {
              maxWidth: false,
            },
          }}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: "none", borderRadius: 0 }}>
                This is an info Alert
              </Alert>
            ),
            leftArea: <Logo />,
            rightArea: (
              <Link
                href="#"
                component={RouterLink}
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
      sx={sx}
    >
      <Main>
        {content?.compact ? (
          <CompactContent layoutQuery={layoutQuery}>{children}</CompactContent>
        ) : (
          children
        )}
      </Main>
    </LayoutSection>
  );
};
