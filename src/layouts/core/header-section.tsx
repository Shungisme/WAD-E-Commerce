import {
  AppBar,
  AppBarProps,
  Box,
  Breakpoint,
  Container,
  ContainerProps,
  Toolbar,
  ToolbarProps,
  useTheme,
} from "@mui/material";
import { bgBlur } from "../../theme/styles";
import { varAlpha } from "../../theme/styles/utils";

export type HeaderSectionProps = AppBarProps & {
  layoutQuery: Breakpoint;
  slots?: {
    leftArea?: React.ReactNode;
    rightArea?: React.ReactNode;
    topArea?: React.ReactNode;
    centerArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  slotProps?: {
    toolbar?: ToolbarProps;
    container?: ContainerProps;
  };
};

export const HeaderSection = ({
  sx,
  slots,
  slotProps,
  layoutQuery = "md",
  ...other
}: HeaderSectionProps) => {
  const theme = useTheme();

  const toolbarStyles = {
    default: {
      ...bgBlur({
        color: varAlpha(theme.palette.background.defaultChannel, 0.8),
      }),
      minHeight: "auto",
      height: 64,
      transition: theme.transitions.create(["height", "background-color"], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
      }),
      [theme.breakpoints.up("sm")]: {
        minHeight: "auto",
      },
      [theme.breakpoints.up(layoutQuery)]: {
        height: 72,
      },
    },
  };

  return (
    <AppBar
      position="sticky"
      component="header"
      color="transparent"
      sx={{
        boxShadow: "none",
        zIndex: theme.zIndex.appBar,
        ...sx,
      }}
      {...other}
    >
      {slots?.topArea}

      <Toolbar
        disableGutters
        {...slotProps?.toolbar}
        sx={{
          ...toolbarStyles.default,
          ...slotProps?.toolbar?.sx,
          height: { xs: 64, md: 72 },
        }}
      >
        <Container
          {...slotProps?.container}
          sx={{
            height: 1,
            display: "flex",
            alignItems: "center",
            ...slotProps?.container?.sx,
          }}
        >
          {slots?.leftArea}

          <Box
            sx={{
              display: "flex",
              flex: "1 1 auto",
              justifyContent: "center",
            }}
          >
            {slots?.centerArea}
          </Box>

          {slots?.rightArea}
        </Container>
      </Toolbar>

      {slots?.bottomArea}
    </AppBar>
  );
};
