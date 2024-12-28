import {
  Box,
  BoxProps,
  Stack,
  styled,
  SxProps,
  Theme,
  useTheme,
} from "@mui/material";
import type { Props } from "react-apexcharts";
import ApexChart from "react-apexcharts";
import { varAlpha } from "../theme/styles/utils";

export const StyledLegend = styled(Box)(({ theme }) => ({
  gap: 6,
  alignItems: "center",
  display: "inline-flex",
  justifyContent: "flex-start",
  fontSize: theme.typography.pxToRem(13),
  fontWeight: theme.typography.fontWeightMedium,
}));

export const StyledDot = styled(Box)<BoxProps>(() => ({
  width: 12,
  height: 12,
  flexShrink: 0,
  display: "flex",
  borderRadius: "50%",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "currentColor",
}));

type ChartLegendsProps = BoxProps & {
  labels?: string[];
  colors?: string[];
  values?: string[];
  sublabels?: string[];
  icons?: React.ReactNode[];
};

export function ChartLegends({
  icons,
  values,
  sublabels,
  labels = [],
  colors = [],
  ...other
}: ChartLegendsProps) {
  return (
    <Box gap={2} display="flex" flexWrap="wrap" {...other}>
      {labels?.map((series, index) => (
        <Stack key={series} spacing={1}>
          <StyledLegend>
            {icons?.length ? (
              <Box
                component="span"
                sx={{
                  color: colors[index],
                  "& svg, & img": { width: 20, height: 20 },
                }}
              >
                {icons?.[index]}
              </Box>
            ) : (
              <StyledDot component="span" sx={{ color: colors[index] }} />
            )}

            <Box component="span" sx={{ flexShrink: 0 }}>
              {series}
              {sublabels && <> {` (${sublabels[index]})`}</>}
            </Box>
          </StyledLegend>

          {values && <Box sx={{ typography: "h6" }}>{values[index]}</Box>}
        </Stack>
      ))}
    </Box>
  );
}

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

export function useChart(options?: ChartOptions): ChartOptions {
  const theme = useTheme();

  const LABEL_TOTAL = {
    show: true,
    label: "Total",
    color: theme.palette.text.secondary,
    fontSize: theme.typography.subtitle2.fontSize as string,
    fontWeight: theme.typography.subtitle2.fontWeight,
  };

  const LABEL_VALUE = {
    offsetY: 8,
    color: theme.palette.text.primary,
    fontSize: theme.typography.h4.fontSize as string,
    fontWeight: theme.typography.h4.fontWeight,
  };

  const RESPONSIVE = [
    {
      breakpoint: theme.breakpoints.values.sm, // sm ~ 600
      options: {
        plotOptions: {
          bar: {
            borderRadius: 3,
            columnWidth: "80%",
          },
        },
      },
    },
    {
      breakpoint: theme.breakpoints.values.md, // md ~ 900
      options: {
        plotOptions: {
          bar: {
            columnWidth: "60%",
          },
        },
      },
    },
    ...(options?.responsive ?? []),
  ];

  return {
    ...options,

    /** **************************************
     * Chart
     *************************************** */
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      parentHeightOffset: 0,
      fontFamily: theme.typography.fontFamily,
      foreColor: theme.palette.text.disabled,
      ...options?.chart,
      animations: {
        enabled: true,
        speed: 360,
        animateGradually: { enabled: true, delay: 120 },
        dynamicAnimation: { enabled: true, speed: 360 },
        ...options?.chart?.animations,
      },
    },

    /** **************************************
     * Colors
     *************************************** */
    colors: options?.colors ?? [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.success.main,
      theme.palette.warning.dark,
      theme.palette.success.darker,
      theme.palette.info.dark,
      theme.palette.info.darker,
    ],

    /** **************************************
     * States
     *************************************** */
    states: {
      ...options?.states,
      hover: {
        ...options?.states?.hover,
        filter: {
          type: "darken",
          ...options?.states?.hover?.filter,
        },
      },
      active: {
        ...options?.states?.active,
        filter: {
          type: "darken",
          ...options?.states?.active?.filter,
        },
      },
    },

    /** **************************************
     * Fill
     *************************************** */
    fill: {
      opacity: 1,
      ...options?.fill,
      gradient: {
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
        ...options?.fill?.gradient,
      },
    },

    /** **************************************
     * Data labels
     *************************************** */
    dataLabels: {
      enabled: false,
      ...options?.dataLabels,
    },

    /** **************************************
     * Stroke
     *************************************** */
    stroke: {
      width: 2.5,
      curve: "smooth",
      lineCap: "round",
      ...options?.stroke,
    },

    /** **************************************
     * Grid
     *************************************** */
    grid: {
      strokeDashArray: 3,
      borderColor: theme.palette.divider,
      ...options?.grid,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        ...options?.grid?.padding,
      },
      xaxis: {
        lines: {
          show: false,
        },
        ...options?.grid?.xaxis,
      },
    },

    /** **************************************
     * Axis
     *************************************** */
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      ...options?.xaxis,
    },
    yaxis: {
      tickAmount: 5,
      ...options?.yaxis,
    },

    /** **************************************
     * Markers
     *************************************** */
    markers: {
      size: 0,
      strokeColors: theme.palette.background.paper,
      ...options?.markers,
    },

    /** **************************************
     * Tooltip
     *************************************** */
    tooltip: {
      theme: "false",
      fillSeriesColor: false,
      x: {
        show: true,
      },
      ...options?.tooltip,
    },

    /** **************************************
     * Legend
     *************************************** */
    legend: {
      show: false,
      position: "top",
      fontWeight: 500,
      fontSize: "13px",
      horizontalAlign: "right",
      ...options?.legend,
      markers: {
        shape: "circle",
        ...options?.legend?.markers,
      },
      labels: {
        colors: theme.palette.text.primary,
        ...options?.legend?.labels,
      },
      itemMargin: {
        horizontal: 8,
        vertical: 8,
        ...options?.legend?.itemMargin,
      },
    },

    /** **************************************
     * plotOptions
     *************************************** */
    plotOptions: {
      ...options?.plotOptions,
      // plotOptions: Bar
      bar: {
        borderRadius: 4,
        columnWidth: "48%",
        borderRadiusApplication: "end",
        ...options?.plotOptions?.bar,
      },

      // plotOptions: Pie + Donut
      pie: {
        ...options?.plotOptions?.pie,
        donut: {
          ...options?.plotOptions?.pie?.donut,
          labels: {
            show: true,
            ...options?.plotOptions?.pie?.donut?.labels,
            value: {
              ...LABEL_VALUE,
              ...options?.plotOptions?.pie?.donut?.labels?.value,
            },
            total: {
              ...LABEL_TOTAL,
              ...options?.plotOptions?.pie?.donut?.labels?.total,
            },
          },
        },
      },

      // plotOptions: Radialbar
      radialBar: {
        ...options?.plotOptions?.radialBar,
        hollow: {
          margin: -8,
          size: "100%",
          ...options?.plotOptions?.radialBar?.hollow,
        },
        track: {
          margin: -8,
          strokeWidth: "50%",
          background: varAlpha(theme.palette.grey["500Channel"], 0.16),
          ...options?.plotOptions?.radialBar?.track,
        },
        dataLabels: {
          ...options?.plotOptions?.radialBar?.dataLabels,
          value: {
            ...LABEL_VALUE,
            ...options?.plotOptions?.radialBar?.dataLabels?.value,
          },
          total: {
            ...LABEL_TOTAL,
            ...options?.plotOptions?.radialBar?.dataLabels?.total,
          },
        },
      },

      // plotOptions: Radar
      radar: {
        ...options?.plotOptions?.radar,
        polygons: {
          fill: {
            colors: ["transparent"],
          },
          strokeColors: theme.palette.divider,
          connectorColors: theme.palette.divider,
          ...options?.plotOptions?.radar?.polygons,
        },
      },

      // plotOptions: polarArea
      polarArea: {
        rings: {
          strokeColor: theme.palette.divider,
        },
        spokes: {
          connectorColors: theme.palette.divider,
        },
        ...options?.plotOptions?.polarArea,
      },

      // plotOptions: heatmap
      heatmap: {
        distributed: true,
        ...options?.plotOptions?.heatmap,
      },
    },

    /** **************************************
     * Responsive
     *************************************** */
    responsive: RESPONSIVE.reduce((acc: typeof RESPONSIVE, cur) => {
      if (!acc.some((item) => item.breakpoint === cur.breakpoint)) {
        acc.push(cur);
      }
      return acc;
    }, []),
  };
}
