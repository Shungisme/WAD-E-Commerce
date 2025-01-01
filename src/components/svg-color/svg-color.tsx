import { Box, BoxProps } from "@mui/material";
import { forwardRef } from "react";
import { svgColorClasses } from "./classes";

export type SvgColorProps = BoxProps & {
  src: string;
};

export const SvgColor = forwardRef<HTMLSpanElement, SvgColorProps>(
  ({ src, width = 24, height, sx, className, ...other }, ref) => (
    <Box
      ref={ref}
      component="span"
      className={svgColorClasses.root.concat(className ? ` ${className}` : "")}
      sx={{
        width,
        flexShrink: 0,
        height: height ?? width,
        display: "inline-flex",
        bgcolor: "currentColor",
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
      {...other}
    />
  )
);
