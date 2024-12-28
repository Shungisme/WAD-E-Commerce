import { Icon, IconProps } from "@iconify/react";
import { Box, BoxProps } from "@mui/material";
import { forwardRef } from "react";
import { iconifyClasses } from "./classes";

export type IconifyProps = BoxProps & IconProps;

export const Iconify = forwardRef<SVGElement, IconifyProps>(
  ({ className, width = 20, sx, ...other }, ref) => (
    <Box
      ssr
      ref={ref}
      component={Icon}
      className={iconifyClasses.root.concat(className ? ` ${className}` : "")}
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
