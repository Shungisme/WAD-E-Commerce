import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Iconify } from "../../components/iconify/iconify";
import { Scrollbar } from "../../components/scrollbar/scrollbar";

export type FiltersProps = {
  price: string;
  category: string;
  sale: string;
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
    categories: { value: string; label: string }[];
    price: { value: string; label: string }[];
    sale: { value: string; label: string }[];
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
  const renderCategory = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Category</Typography>
      <RadioGroup>
        {options.categories.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Radio
                checked={filters.category.includes(option.value)}
                onChange={() => onSetFilters({ category: option.value })}
              />
            }
            label={option.label}
          />
        ))}
      </RadioGroup>
    </Stack>
  );

  const renderPrice = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Price</Typography>
      <RadioGroup>
        {options.price.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Radio
                checked={filters.price.includes(option.value)}
                onChange={() => onSetFilters({ price: option.value })}
              />
            }
            label={option.label}
          />
        ))}
      </RadioGroup>
    </Stack>
  );

  const renderSale = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Sale</Typography>
      <FormGroup>
        {options.sale.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={filters.sale.includes(option.value)}
                onChange={() => onSetFilters({ sale: option.value })}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
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
            {renderPrice}
            {renderSale}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
