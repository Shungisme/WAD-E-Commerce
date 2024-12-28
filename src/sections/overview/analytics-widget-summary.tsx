import { Chart, ChartOptions, useChart } from "../../components/chart";
import { ColorType } from "../../theme/core";
import { Box, Card, CardProps, useTheme } from "@mui/material";
import {
  formatNumber,
  formatPercent,
  formatShortenNumber,
} from "../../utils/format-number";
import { varAlpha } from "../../theme/styles/utils";
import { Iconify } from "../../components/iconify";
import { bgGradient } from "../../theme/styles";
import { SvgColor } from "../../components/svg-color";

type Props = CardProps & {
  title: string;
  total: number;
  percent: number;
  color?: ColorType;
  icon: React.ReactNode;
  chart: {
    series: number[];
    categories: string[];
    options?: ChartOptions;
  };
};

export function AnalyticsWidgetSummary({
  icon,
  title,
  total,
  chart,
  percent,
  color = "primary",
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  const chartColors = [theme.palette[color].dark];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    xaxis: { categories: chart.categories },
    grid: {
      padding: {
        top: 6,
        left: 6,
        right: 6,
        bottom: 6,
      },
    },
    tooltip: {
      y: {
        formatter: (value: number) => formatNumber(value),
        title: { formatter: () => "" },
      },
    },
    ...chart.options,
  });

  const renderTrending = (
    <Box
      sx={{
        top: 16,
        gap: 0.5,
        right: 16,
        display: "flex",
        position: "absolute",
        alignItems: "center",
      }}
    >
      <Iconify
        width={20}
        icon={percent < 0 ? "eva:trending-down-fill" : "eva:trending-up-fill"}
      />
      <Box component="span" sx={{ typography: "subtitle2" }}>
        {percent > 0 && "+"}
        {formatPercent(percent)}
      </Box>
    </Box>
  );

  return (
    <Card
      sx={{
        ...bgGradient({
          color: `135deg, ${varAlpha(
            theme.palette[color].lighterChannel,
            0.48
          )}, ${varAlpha(theme.palette[color].lightChannel, 0.48)}`,
        }),
        p: 3,
        boxShadow: "none",
        position: "relative",
        color: `${color}.darker`,
        backgroundColor: "common.white",
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ width: 48, height: 48, mb: 3 }}>{icon}</Box>

      {renderTrending}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <Box sx={{ flexGrow: 1, minWidth: 112 }}>
          <Box sx={{ mb: 1, typography: "subtitle2" }}>{title}</Box>
          <Box sx={{ typography: "h4" }}>{formatShortenNumber(total)}</Box>
        </Box>

        <Chart
          type="line"
          series={[{ data: chart.series }]}
          options={chartOptions}
          width={84}
          height={56}
        />
      </Box>

      <SvgColor
        src="/assets/background/shape-square.svg"
        sx={{
          top: 0,
          left: -20,
          width: 240,
          zIndex: -1,
          height: 240,
          opacity: 0.24,
          position: "absolute",
          color: `${color}.main`,
        }}
      />
    </Card>
  );
}
