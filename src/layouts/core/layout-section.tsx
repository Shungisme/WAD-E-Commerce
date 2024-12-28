import { Box, GlobalStyles, SxProps, Theme, useTheme } from "@mui/material";
import { layoutClasses } from "../classes";

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
    <Box id="root__layout" className={layoutClasses.root}>
      {sidebarSection}
      <Box
        display="flex"
        flex="1 1 auto"
        flexDirection="column"
        className={layoutClasses.hasSidebar}
      >
        {headerSection}
        {children}
        {footerSection}
      </Box>
    </Box>
  );
};
