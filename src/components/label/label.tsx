import { Box, BoxProps, useTheme } from "@mui/material";
import { forwardRef } from "react";
import { StyledLabel } from "./styles";
import { labelClasses } from "./classes";

export type LabelColor =
  | "default"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

export type LabelVariant = "filled" | "outlined" | "soft" | "inverted";

export interface LabelProps extends BoxProps {
  color?: LabelColor;
  variant?: LabelVariant;
  endIcon?: React.ReactElement | null;
  startIcon?: React.ReactElement | null;
}

export const Label = forwardRef<HTMLSpanElement, LabelProps>(
  (
    {
      children,
      color = "default",
      variant = "soft",
      startIcon,
      endIcon,
      sx,
      className,
      ...other
    },
    ref
  ) => {
    const iconStyles = {
      width: 16,
      height: 16,
      "& svg, img": {
        width: 1,
        height: 1,
        objectFit: "cover",
      },
    };

    return (
      <StyledLabel
        ref={ref}
        className={labelClasses.root.concat(className ? ` ${className}` : "")}
        ownerState={{ color, variant }}
        sx={{
          ...(startIcon && {
            pl: 0.75,
          }),
          ...(endIcon && {
            pr: 0.75,
          }),
          ...sx,
        }}
        {...other}
      >
        {startIcon && (
          <Box
            component="span"
            className={labelClasses.icon}
            sx={{ mr: 0.75, ...iconStyles }}
          >
            {startIcon}
          </Box>
        )}

        {typeof children === "string" ? sentenceCase(children) : children}

        {endIcon && (
          <Box
            component="span"
            className={labelClasses.icon}
            sx={{
              ml: 0.7,
              ...iconStyles,
            }}
          >
            {endIcon}
          </Box>
        )}
      </StyledLabel>
    );
  }
);

function sentenceCase(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
