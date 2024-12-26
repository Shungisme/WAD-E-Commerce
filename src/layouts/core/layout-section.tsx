import { Box, GlobalStyles, SxProps, Theme, useTheme } from "@mui/material";

export type LayoutSectionProps = {
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
  footerSection?: React.ReactNode;
  headerSection?: React.ReactNode;
  sidebarSection?: React.ReactNode;
};

export const LayoutSection = ({
  sx,
  children,
  footerSection,
  headerSection,
  sidebarSection,
}: LayoutSectionProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        overflow: "hidden",
        transition: theme.transitions.create(["margin"]),
        ...sx,
      }}
    >
      {sidebarSection && (
        <Box
          component="aside"
          sx={{
            flexShrink: 0,
            width: {
              xs: 0,
              md: "280px",
            },
            transition: theme.transitions.create(["width"]),
          }}
        >
          {sidebarSection}
        </Box>
      )}

      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          minHeight: "100vh",
          overflow: " hidden",
          p: { xs: 2, md: 3 },
          pt: { xs: "76px", md: "88px" },
          pb: { xs: "56px", md: "68px" },
        }}
      >
        {headerSection && (
          <Box
            component="header"
            sx={{
              position: "fixed",
              top: 0,
              left: { xs: 0, md: "280px" },
              right: 0,
              zIndex: theme.zIndex.appBar,
              transition: theme.transitions.create(["left"]),
            }}
          >
            {headerSection}
          </Box>
        )}

        {children && (
          <Box
            sx={{
              flexGrow: 1,
              overflow: "auto",
              minHeight: "100%",
            }}
          >
            {children}
          </Box>
        )}

        {footerSection && (
          <Box
            component="footer"
            sx={{
              position: "fixed",
              bottom: 0,
              left: { xs: 0, md: "280px" },
              right: 0,
              zIndex: theme.zIndex.appBar,
              transition: theme.transitions.create(["left"]),
            }}
          >
            {footerSection}
          </Box>
        )}
      </Box>
    </Box>
  );
};
