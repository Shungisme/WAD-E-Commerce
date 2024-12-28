import { Card, CardHeader, CardProps, Divider, useTheme } from "@mui/material";
import { Chart, ChartOptions } from "../../components/chart/chart";
import { useChart } from "../../components/chart/use-chart";
import { ChartLegends } from "../../components/chart/chart-legends";

type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    categories: string[];
    series: {
      name: string;
      data: number[];
    }[];
    options?: ChartOptions;
  };
};

export function AnalyticsCurrentSubject({
  title,
  subheader,
  chart,
  ...other
}: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [
    theme.palette.primary.main,
    theme.palette.warning.main,
    theme.palette.info.main,
  ];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: { width: 2 },
    fill: { opacity: 0.48 },
    xaxis: {
      categories: chart.categories,
      labels: {
        style: {
          colors: [...Array(6)].map(() => theme.palette.text.secondary),
        },
      },
    },
    ...chart.options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Chart
        type="radar"
        series={chart.series}
        options={chartOptions}
        width={300}
        height={300}
        sx={{ my: 1, mx: "auto" }}
      />

      <Divider sx={{ borderStyle: "dashed" }} />

      <ChartLegends
        labels={chart.series.map((item) => item.name)}
        colors={chartOptions?.colors}
        sx={{ p: 3, justifyContent: "center" }}
      />
    </Card>
  );
}
