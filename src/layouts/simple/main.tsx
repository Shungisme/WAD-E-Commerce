import { Box, BoxProps, Breakpoint, useTheme } from "@mui/material";
import { layoutClasses } from "../classes";

export const Main = ({ children, sx, ...other }: BoxProps) => {
  return (
    <Box
      component="main"
      className={layoutClasses.main}
      sx={{
        display: "flex",
        flex: "1 1 auto",
        flexDirection: "column",
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
};

export const CompactContent = ({
  sx,
  layoutQuery,
  children,
  ...other
}: BoxProps & { layoutQuery: Breakpoint }) => {
  const theme = useTheme();

  return (
    <Box
      className={layoutClasses.content}
      sx={{
        width: 1,
        mx: "auto",
        display: "flex",
        flex: "1 1 auto",
        textAlign: "center",
        flexDirection: "column",
        p: theme.spacing(3, 2, 10, 2),
        maxWidth: 448,
        [theme.breakpoints.up(layoutQuery)]: {
          justifyContent: "center",
          p: theme.spacing(10, 0, 10, 0),
        },
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
};
