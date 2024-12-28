import { Box, BoxProps, SxProps, Theme, useTheme } from "@mui/material";
import type { Props } from "react-apexcharts";
import ApexChart from "react-apexcharts";
import { chartClasses } from "./classes";

export type ChartProps = {
  type: Props["type"];
  series: Props["series"];
  options: Props["options"];
};

export type ChartBaseProps = Props;

export type ChartOptions = Props["options"];

export type ChartLoadingProps = {
  disabled?: boolean;
  sx?: SxProps<Theme>;
};

export function Chart({
  sx,
  type,
  series,
  height,
  options,
  className,
  width = "100%",
  ...other
}: BoxProps & ChartProps) {
  return (
    <Box
      dir="ltr"
      className={chartClasses.root.concat(className ? ` ${className}` : "")}
      sx={{
        width,
        height,
        flexShrink: 0,
        borderRadius: 1.5,
        position: "relative",
        ...sx,
      }}
      {...other}
    >
      <ApexChart
        type={type}
        series={series}
        options={options}
        width="100%"
        height="100%"
      />
    </Box>
  );
}
