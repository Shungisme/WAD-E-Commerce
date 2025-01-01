import {
  Box,
  FormControl,
  Grid2,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DashboardContent } from "../../../layouts/dashboard/main";
import { AnalyticsWidgetSummary } from "../analytics-widget-summary";
import { AnalyticsOrdersPie } from "../analytics-current-visits";
import { AnalyticsOrdersBar } from "../anaylytics-website-visits";
import { AnalyticsOrdersHorizontalBar } from "../analytics-conversion-rates";
import { AnalyticsOrdersRadar } from "../analytics-current-subject";
import useStatistics from "../../../hooks/use-statistics";
import { useMemo } from "react";
import { Iconify } from "../../../components/iconify/iconify";

const CATEGORY_OPTIONS: Record<
  string,
  {
    color: "primary" | "error" | "secondary" | "warning" | "success" | "info";
    icon: string;
  }
> = {
  "Sản phẩm giày": {
    color: "primary",
    icon: "/assets/icons/glass/ic-glass-shoe.svg",
  },
  "Sản phẩm áo": {
    color: "warning",
    icon: "/assets/icons/glass/ic-glass-shirt.svg",
  },
  "Sản phẩm quần": {
    color: "secondary",
    icon: "/assets/icons/glass/ic-glass-trousers.svg",
  },
  "Phụ kiện": {
    color: "error",
    icon: "/assets/icons/glass/ic-glass-accessory.svg",
  },
  "Quà lưu niệm": {
    color: "success",
    icon: "/assets/icons/glass/ic-glass-souvenir.svg",
  },
};

export function OverviewAnalyticsView() {
  const { getStatistics, year, setYear } = useStatistics();

  const getCurrentYear = useMemo(() => {
    return new Date().getFullYear();
  }, []);

  return (
    <DashboardContent maxWidth="xl">
      <Box
        sx={{
          mb: { xs: 3, md: 5 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">Statistic 📊</Typography>

        <FormControl
          sx={{
            minWidth: 120,
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
              backgroundColor: (theme) => theme.palette.background.neutral,
              transition: (theme) =>
                theme.transitions.create(["box-shadow", "background-color"]),
              "&:hover": {
                backgroundColor: "background.paper",
              },
            },
          }}
        >
          <Select
            value={year}
            onChange={(e) => setYear((prev) => Number(e.target.value))}
            displayEmpty
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="solar:calendar-date-bold"
                  sx={{ color: "text.secondary", ml: 1 }}
                />
              </InputAdornment>
            }
          >
            {[...Array(6)].map((_, index) => {
              const yearOption = getCurrentYear - index;
              return (
                <MenuItem
                  key={yearOption}
                  value={yearOption}
                  sx={{
                    typography: "body2",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  {yearOption}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>

      <Grid2 container spacing={3}>
        {getStatistics?.data?.month?.series?.map(
          (category: any, index: number) => (
            <Grid2 key={category?.name} size={{ xs: 12, sm: 6, md: 4 }}>
              <AnalyticsWidgetSummary
                title={category.name}
                percent={
                  ((category.data[category.data.length - 1] -
                    category.data[0]) /
                    category.data[0]) *
                  100
                }
                total={category.data.reduce((a: number, b: number) => a + b, 0)}
                icon={
                  <img
                    alt={category.name}
                    src={CATEGORY_OPTIONS[category.name]?.icon}
                  />
                }
                color={
                  CATEGORY_OPTIONS[
                    category?.name as keyof typeof CATEGORY_OPTIONS
                  ]?.color
                }
                chart={{
                  categories: getStatistics?.data?.month?.categories,
                  series: category.data,
                }}
              />
            </Grid2>
          )
        )}

        <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsOrdersPie
            title="Orders pie chart"
            chart={{
              series:
                getStatistics?.data?.year?.categories?.map(
                  (category: string, index: number) => {
                    return {
                      label: category,
                      value: getStatistics?.data?.year?.series[index],
                    };
                  }
                ) ?? [],
            }}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsOrdersBar
            title="Orders bar chart"
            subheader="Details of Orders"
            chart={{
              categories: getStatistics?.data?.month?.categories ?? [],
              series: getStatistics?.data?.month?.series ?? [],
            }}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsOrdersHorizontalBar
            title="Orders horizontal bar chart"
            subheader="Details of Orders"
            chart={{
              categories: getStatistics?.data?.month?.categories ?? [],
              series: getStatistics?.data?.month?.series ?? [],
            }}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsOrdersRadar
            title="Orders radar chart"
            chart={{
              categories: getStatistics?.data?.month?.categories ?? [],
              series: getStatistics?.data?.month?.series ?? [],
            }}
          />
        </Grid2>
      </Grid2>
    </DashboardContent>
  );
}
