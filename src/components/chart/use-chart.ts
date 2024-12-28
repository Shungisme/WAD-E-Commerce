import { useTheme } from "@mui/material";
import { ChartOptions } from "./chart";
import { varAlpha } from "../../theme/styles/utils";

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
      breakpoint: theme.breakpoints.values.sm,
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
      breakpoint: theme.breakpoints.values.md,
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

    dataLabels: {
      enabled: false,
      ...options?.dataLabels,
    },

    stroke: {
      width: 2.5,
      curve: "smooth",
      lineCap: "round",
      ...options?.stroke,
    },

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

    markers: {
      size: 0,
      strokeColors: theme.palette.background.paper,
      ...options?.markers,
    },

    tooltip: {
      theme: "false",
      fillSeriesColor: false,
      x: {
        show: true,
      },
      ...options?.tooltip,
    },

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

    plotOptions: {
      ...options?.plotOptions,
      bar: {
        borderRadius: 4,
        columnWidth: "48%",
        borderRadiusApplication: "end",
        ...options?.plotOptions?.bar,
      },

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

      polarArea: {
        rings: {
          strokeColor: theme.palette.divider,
        },
        spokes: {
          connectorColors: theme.palette.divider,
        },
        ...options?.plotOptions?.polarArea,
      },

      heatmap: {
        distributed: true,
        ...options?.plotOptions?.heatmap,
      },
    },

    responsive: RESPONSIVE.reduce((acc: typeof RESPONSIVE, cur) => {
      if (!acc.some((item) => item.breakpoint === cur.breakpoint)) {
        acc.push(cur);
      }
      return acc;
    }, []),
  };
}
