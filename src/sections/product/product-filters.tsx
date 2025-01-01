import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Iconify } from "../../components/iconify/iconify";
import { Scrollbar } from "../../components/scrollbar/scrollbar";
import { useTheme } from "@mui/material";
import { useState } from "react";
import IconifyIcon from "../../components/iconifyIcon";
import { slugify } from "../../utils/slugify";

export type FiltersProps = {
  limit: number;
  page: number;
  categorySlug: string;
  sort: string;
  search: string;
};

type ProductFiltersProps = {
  canReset: boolean;
  openFilter: boolean;
  filters: FiltersProps;
  onOpenFilter: () => void;
  onCloseFilter: () => void;
  onResetFilter: () => void;
  onSetFilters: (updateState: Partial<FiltersProps>) => void;
  options: {
    categories: any;
  };
};

export function ProductFilters({
  filters,
  options,
  canReset,
  openFilter,
  onSetFilters,
  onOpenFilter,
  onCloseFilter,
  onResetFilter,
}: ProductFiltersProps) {
  const theme = useTheme();
  const [showCategory, setShowCategory] = useState<Record<string, boolean>>({});

  const renderCategory = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Category</Typography>
      {options.categories?.map((item: any, index: number) => {
        return (
          <>
            <Box
              key={"category" + index}
              onClick={() =>
                setShowCategory((prev) => ({
                  [item[0]]: !prev[item[0]],
                }))
              }
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "3rem",
                cursor: "pointer",
                p: 1,
                "&:hover": {
                  backgroundColor: theme.palette.grey[300],
                },
              }}
            >
              <Typography>{item[0]}</Typography>
              <IconifyIcon icon={"mingcute:down-line"} />
            </Box>

            {showCategory[item[0]] && (
              <Box
                style={{
                  cursor: "pointer",
                  padding: 10,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? theme.palette.common.black
                      : theme.palette.common.white,
                  boxShadow: `${
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.24)"
                      : "rgba(0, 0, 0, 0.24)"
                  } 0px 3px 8px`,
                }}
              >
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    onSetFilters({
                      ...filters,
                      categorySlug: slugify(
                        (event.target as HTMLInputElement).value
                      ),
                    })
                  }
                >
                  {item[1] &&
                    item[1].map((item: any, index: number) => {
                      return (
                        <>
                          <FormControlLabel
                            key={"cateChild" + index}
                            value={item}
                            control={
                              <Radio
                                checked={filters.categorySlug === slugify(item)}
                              />
                            }
                            label={item}
                          />
                        </>
                      );
                    })}
                </RadioGroup>
              </Box>
            )}

            {index !== options.categories?.length - 1 && <Divider />}
          </>
        );
      })}
    </Stack>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="ic:round-filter-list" />
          </Badge>
        }
        onClick={onOpenFilter}
      >
        Filters
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, overflow: "hidden" },
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          sx={{ pl: 2.5, pr: 1.5, py: 2 }}
        >
          <Typography variant="h6" flexGrow={1}>
            Filters
          </Typography>

          <IconButton onClick={onResetFilter}>
            <Badge color="error" variant="dot" invisible={!canReset}>
              <Iconify icon="solar:refresh-linear" />
            </Badge>
          </IconButton>

          <IconButton onClick={onCloseFilter}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            {renderCategory}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
