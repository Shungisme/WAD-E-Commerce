import { Box, BoxProps, Breakpoint, useTheme } from "@mui/material";

type MainProps = BoxProps & {
  layoutQuery: Breakpoint;
};

export const Main = ({ sx, children, layoutQuery, ...other }: MainProps) => {
  const theme = useTheme();

  const renderContent = (
    <Box
      sx={{
        py: 10,
        px: 3,
        width: 1,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        maxWidth: "420px",
      }}
    >
      {children}
    </Box>
  );

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flex: "1 1 auto",
        alignItems: "center",
        flexDirection: "column",
        p: theme.spacing(3, 2, 10, 2),
        [theme.breakpoints.up(layoutQuery)]: {
          justifyContent: "center",
          p: theme.spacing(10, 0, 10, 0),
        },
        ...sx,
      }}
      {...other}
    >
      {renderContent}
    </Box>
  );
};
