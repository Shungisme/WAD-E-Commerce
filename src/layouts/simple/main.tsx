import { Box, BoxProps, Breakpoint, useTheme } from "@mui/material";

export const Main = ({ children, sx, ...other }: BoxProps) => {
  return (
    <Box
      component="main"
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
      sx={{
        width: 1,
        mx: "auto",
        display: "flex",
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