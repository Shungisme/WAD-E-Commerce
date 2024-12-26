import { Icon } from "@iconify/react";
import { Box, BoxProps, IconProps, SxProps, Theme } from "@mui/material";
import { forwardRef } from "react";

export type IconifyProps = BoxProps & IconProps;

export const Iconify = forwardRef<SVGElement, IconifyProps>(
  ({ width = 20, sx, ...other }, ref) => (
    <Box
      ssr
      ref={ref}
      component={Icon}
      sx={{
        width,
        height: width,
        flexShrink: 0,
        display: "inline-flex",
        ...sx,
      }}
      {...other}
    />
  )
);

export type FlagIconProps = BoxProps & {
  code?: string;
};

export const FlagIcon = forwardRef<HTMLSpanElement, FlagIconProps>(
  ({ code, sx, ...other }, ref) => {
    const baseStyles: SxProps<Theme> = {
      width: 26,
      height: 20,
      flexShrink: 0,
      overflow: "hidden",
      borderRadius: "5px",
      alignItems: "center",
      display: "inline-flex",
      justifyContent: "center",
      bgcolor: "background.neutral",
    };

    if (!code) {
      return null;
    }

    return (
      <Box ref={ref} component="span" sx={{ ...baseStyles, ...sx }} {...other}>
        <Box
          component="img"
          loading="lazy"
          alt={code}
          src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${code?.toUpperCase()}.svg`}
          sx={{
            width: 1,
            height: 1,
            maxWidth: "unset",
            objectFit: "cover",
          }}
        />
      </Box>
    );
  }
);
