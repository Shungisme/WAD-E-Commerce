import {
  Box,
  BoxProps,
  Breakpoint,
  Container,
  ContainerProps,
  useTheme,
} from "@mui/material";

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

type DashboardContentProps = ContainerProps & {
  disablePadding?: boolean;
};

export const DashboardContent = ({
  sx,
  children,
  disablePadding,
  maxWidth = "xl",
  ...other
}: DashboardContentProps) => {
  const theme = useTheme();

  const layoutQuery: Breakpoint = "lg";

  return (
    <Container
      maxWidth={maxWidth || false}
      sx={{
        display: "flex",
        flex: "1 1 auto",
        flexDirection: "column",
        pt: theme.spacing(1),
        pb: theme.spacing(8),
        [theme.breakpoints.up(layoutQuery)]: {
          px: theme.spacing(5),
        },
        ...(disablePadding && {
          p: {
            xs: 0,
            sm: 0,
            md: 0,
            lg: 0,
            xl: 0,
          },
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Container>
  );
};
