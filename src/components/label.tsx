import {
  Box,
  styled,
  useTheme,
  type BoxProps,
  type Theme,
} from "@mui/material";
import { stylesMode, varAlpha } from "../theme/styles/utils";
import { forwardRef } from "react";

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

export const StyledLabel = styled(Box)(
  ({
    theme,
    ownerState: { color, variant },
  }: {
    theme: Theme;
    ownerState: {
      color: LabelColor;
      variant: LabelVariant;
    };
  }) => {
    const defaultColor = {
      ...(color === "default" && {
        /**
         * @variant filled
         */
        ...(variant === "filled" && {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.text.primary,
          [stylesMode.dark]: { color: theme.palette.grey[800] },
        }),
        /**
         * @variant outlined
         */
        ...(variant === "outlined" && {
          backgroundColor: "transparent",
          color: theme.palette.text.primary,
          border: `2px solid ${theme.palette.text.primary}`,
        }),
        /**
         * @variant soft
         */
        ...(variant === "soft" && {
          color: theme.palette.text.secondary,
          backgroundColor: varAlpha(theme.palette.grey["500Channel"], 0.16),
        }),
        /**
         * @variant inverted
         */
        ...(variant === "inverted" && {
          color: theme.palette.grey[800],
          backgroundColor: theme.palette.grey[300],
        }),
      }),
    };

    const styleColors = {
      ...(color !== "default" && {
        /**
         * @variant filled
         */
        ...(variant === "filled" && {
          color: theme.palette[color].contrastText,
          backgroundColor: theme.palette[color].main,
        }),
        /**
         * @variant outlined
         */
        ...(variant === "outlined" && {
          backgroundColor: "transparent",
          color: theme.palette[color].main,
          border: `2px solid ${theme.palette[color].main}`,
        }),
        /**
         * @variant soft
         */
        ...(variant === "soft" && {
          color: theme.palette[color].dark,
          backgroundColor: varAlpha(theme.palette[color].mainChannel, 0.16),
          [stylesMode.dark]: { color: theme.palette[color].light },
        }),
        /**
         * @variant inverted
         */
        ...(variant === "inverted" && {
          color: theme.palette[color].darker,
          backgroundColor: theme.palette[color].lighter,
        }),
      }),
    };

    return {
      height: 24,
      minWidth: 24,
      lineHeight: 0,
      cursor: "default",
      alignItems: "center",
      whiteSpace: "nowrap",
      display: "inline-flex",
      justifyContent: "center",
      padding: theme.spacing(0, 0.75),
      fontSize: theme.typography.pxToRem(12),
      fontWeight: theme.typography.fontWeightBold,
      borderRadius: theme.shape.borderRadius * 0.75,
      transition: theme.transitions.create("all", {
        duration: theme.transitions.duration.shorter,
      }),
      ...defaultColor,
      ...styleColors,
    };
  }
);

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
    const theme = useTheme();

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
        component="span"
        ownerState={{ color, variant }}
        sx={{
          ...(startIcon && { pl: 0.75 }),
          ...(endIcon && { pr: 0.75 }),
          ...sx,
        }}
        theme={theme}
        {...other}
      >
        {startIcon && (
          <Box component="span" sx={{ mr: 0.75, ...iconStyles }}>
            {startIcon}
          </Box>
        )}

        {typeof children === "string" ? sentenceCase(children) : children}

        {endIcon && (
          <Box component="span" sx={{ ml: 0.75, ...iconStyles }}>
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
