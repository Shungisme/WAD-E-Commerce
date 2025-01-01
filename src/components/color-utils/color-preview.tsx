import { Box, BoxProps } from "@mui/material";
import { ColorPickerProps } from "./color-picker";
import { forwardRef } from "react";
import { varAlpha } from "../../theme/styles/utils";

export type ColorPreviewProps = {
  limit?: number;
  colors: ColorPickerProps["colors"];
};

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
