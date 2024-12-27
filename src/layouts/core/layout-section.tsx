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
      {sidebarSection}
      <Box display="flex" flex="1 1 auto" flexDirection="column">
        {headerSection}
        {children}
        {footerSection}
      </Box>
    </Box>
  );
};
