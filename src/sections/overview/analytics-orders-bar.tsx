import { alpha, Card, CardHeader, CardProps, useTheme } from "@mui/material";
import { Chart, ChartOptions } from "../../components/chart/chart";
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

export function AnalyticsOrdersBar({
  title,
  subheader,
  chart,
  ...other
}: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [
    theme.palette.primary.main,
    theme.palette.warning.main,
    theme.palette.secondary.dark,
    theme.palette.error.main,
    theme.palette.info.main,
  ];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: {
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: chart.categories,
    },
    legend: {
      show: true,
    },
    tooltip: {
      y: {
        formatter: (value: number) => `${value}`,
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
        height={364}
        sx={{ py: 2.5, pl: 1, pr: 2.5 }}
      />
    </Card>
  );
}
