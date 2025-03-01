import { alpha, Card, CardHeader, CardProps, useTheme } from "@mui/material";
import { Chart, ChartOptions } from "../../components/chart/chart";
import { formatNumber } from "../../utils/format-number";
import { useChart } from "../../components/chart/use-chart";

type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    categories?: string[];
    series: {
      name: string;
      data: number[];
    }[];
    options?: ChartOptions;
  };
};

export function AnalyticsOrdersHorizontalBar({
  title,
  subheader,
  chart,
  ...other
}: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [
    theme.palette.primary.main,
    theme.palette.warning.main,
  ];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: { width: 2, colors: ["transparent"] },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number) => formatNumber(value),
        title: { formatter: (seriesName: string) => `${seriesName}: ` },
      },
    },
    xaxis: { categories: chart.categories },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: "10px",
        colors: ["#FFFFFF", theme.palette.text.primary],
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 2,
        barHeight: "48%",
        dataLabels: { position: "top" },
      },
    },
    ...chart.options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Chart
        type="bar"
        series={chart.series}
        options={chartOptions}
        height={360}
        sx={{ py: 2.5, pl: 1, pr: 2.5 }}
      />
    </Card>
  );
}
