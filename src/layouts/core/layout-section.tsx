import { Box, SxProps, Theme } from "@mui/material";
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
  return (
    <Box id="root__layout" className={layoutClasses.root} sx={sx}>
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
