import {
  Box,
  BoxProps,
  ButtonBase,
  Stack,
  SxProps,
  Theme,
} from "@mui/material";
import { forwardRef, useCallback } from "react";
import { varAlpha } from "../theme/styles/utils";
import { Iconify } from "./iconify";

export type ColorPickerProps = {
  multi?: boolean;
  colors: string[];
  selected: string | string[];
  limit?: "auto" | number;
  onSelectColor: (color: string | string[]) => void;
  slotProps?: {
    button?: SxProps<Theme>;
  };
};

export type ColorPreviewProps = {
  limit?: number;
  colors: ColorPickerProps["colors"];
};

export const ColorPicker = forwardRef<
  HTMLDivElement,
  BoxProps & ColorPickerProps
>(
  (
    {
      colors,
      selected,
      onSelectColor,
      limit = "auto",
      sx,
      slotProps,
      ...other
    },
    ref
  ) => {
    const singleSelect = typeof selected === "string";

    const handleSelect = useCallback(
      (color: string) => {
        if (singleSelect) {
          if (color !== selected) {
            onSelectColor(color);
          }
        } else {
          const newSelected = selected.includes(color)
            ? selected.filter((value) => value !== color)
            : [...selected, color];

          onSelectColor(newSelected);
        }
      },
      [onSelectColor, selected, singleSelect]
    );

    return (
      <Box
        ref={ref}
        component="ul"
        sx={{
          flexWrap: "wrap",
          flexDirection: "row",
          display: "inline-flex",
          ...(limit !== "auto" && {
            width: limit * 36,
            justifyContent: "flex-end",
          }),
          ...sx,
        }}
        {...other}
      >
        {colors.map((color) => {
          const hasSelected = singleSelect
            ? selected === color
            : selected.includes(color);

          function hexAlpha(color: string, arg1: number) {
            throw new Error("Function not implemented.");
          }

          return (
            <Box component="li" key={color} sx={{ display: "inline-flex" }}>
              <ButtonBase
                aria-label={color}
                onClick={() => handleSelect(color)}
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  ...slotProps?.button,
                }}
              >
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={(theme) => ({
                    width: 20,
                    height: 20,
                    bgcolor: color,
                    borderRadius: "50%",
                    border: `solid 1px ${varAlpha(
                      theme.palette.grey["500Channel"],
                      0.16
                    )}`,
                    ...(hasSelected && {
                      transform: "scale(1.3)",
                      boxShadow: `4px 4px 8px 0 ${hexAlpha(color, 0.48)}`,
                      outline: `solid 2px ${hexAlpha(color, 0.08)}`,
                      transition: theme.transitions.create("all", {
                        duration: theme.transitions.duration.shortest,
                      }),
                    }),
                  })}
                >
                  <Iconify
                    width={hasSelected ? 12 : 0}
                    icon="eva:checkmark-fill"
                    sx={(theme) => ({
                      color: theme.palette.getContrastText(color),
                      transition: theme.transitions.create("all", {
                        duration: theme.transitions.duration.shortest,
                      }),
                    })}
                  />
                </Stack>
              </ButtonBase>
            </Box>
          );
        })}
      </Box>
    );
  }
);

export const ColorPreview = forwardRef<
  HTMLDivElement,
  BoxProps & ColorPreviewProps
>(({ colors, limit = 3, sx, ...other }, ref) => {
  const colorsRange = colors.slice(0, limit);

  const restColors = colors.length - limit;

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        ...sx,
      }}
      {...other}
    >
      {colorsRange.map((color, index) => (
        <Box
          key={color + index}
          sx={{
            ml: -0.75,
            width: 16,
            height: 16,
            bgcolor: color,
            borderRadius: "50%",
            border: (theme) => `solid 2px ${theme.palette.background.paper}`,
            boxShadow: (theme) =>
              `inset -1px 1px 2px ${varAlpha(
                theme.palette.common.blackChannel,
                0.24
              )}`,
          }}
        />
      ))}

      {colors.length > limit && (
        <Box
          component="span"
          sx={{ typography: "subtitle2" }}
        >{`+${restColors}`}</Box>
      )}
    </Box>
  );
});
