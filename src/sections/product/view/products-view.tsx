import { useState, useCallback } from "react";

import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { FiltersProps, ProductFilters } from "../product-filters";
import { DashboardContent } from "../../../layouts/dashboard/main";
import { ProductSort } from "../product-sort";
import { _products } from "../../../mocks/_data";
import { ProductItem } from "../product-item";
import { Button, Grid2, InputAdornment, OutlinedInput } from "@mui/material";
import { Iconify } from "../../../components/iconify/iconify";
import AddProductDialog from "../add-product-dialog";

const CATEGORY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "shose", label: "Shose" },
  { value: "apparel", label: "Apparel" },
  { value: "accessories", label: "Accessories" },
];

const PRICE_OPTIONS = [
  { value: "below", label: "Below $25" },
  { value: "between", label: "Between $25 - $75" },
  { value: "above", label: "Above $75" },
];

const SALE_OPTIONS = [
  { value: "below", label: "Below 25%" },
  { value: "between", label: "Between 25% - 50%" },
  { value: "above", label: "Above 50%" },
];

const defaultFilters = {
  price: "",
  category: CATEGORY_OPTIONS[0].value,
  sale: "",
};

export function ProductsView() {
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const [sortBy, setSortBy] = useState("price");

  const [openFilter, setOpenFilter] = useState(false);

  const [filters, setFilters] = useState<FiltersProps>(defaultFilters);

  const handleOpenFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  const handleSetFilters = useCallback((updateState: Partial<FiltersProps>) => {
    setFilters((prevValue) => ({ ...prevValue, ...updateState }));
  }, []);

  const canReset = Object.keys(filters).some(
    (key) =>
      filters[key as keyof FiltersProps] !==
      defaultFilters[key as keyof FiltersProps]
  );

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Products
        </Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => {
            setOpenAddDialog(true);
          }}
        >
          New product
        </Button>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <OutlinedInput
          fullWidth
          placeholder="Search product…"
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                width={20}
                icon="eva:search-fill"
                sx={{
                  color: "text.disabled",
                }}
              />
            </InputAdornment>
          }
          sx={{ maxWidth: 320 }}
        />

        <Box gap={1} display="flex" flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            canReset={canReset}
            filters={filters}
            onSetFilters={handleSetFilters}
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
            onResetFilter={() => setFilters(defaultFilters)}
            options={{
              categories: CATEGORY_OPTIONS,
              price: PRICE_OPTIONS,
              sale: SALE_OPTIONS,
            }}
          />

          <ProductSort
            sortBy={sortBy}
            onSort={handleSort}
            options={[
              { value: "saleDesc", label: "Sale: High-Low" },
              { value: "saleAsc", label: "Sale: Low-High" },
              { value: "priceDesc", label: "Price: High-Low" },
              { value: "priceAsc", label: "Price: Low-High" },
            ]}
          />
        </Box>
      </Box>

      <Grid2 container spacing={3}>
        {_products.map((product) => (
          <Grid2
            key={product.id}
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <ProductItem product={product} />
          </Grid2>
        ))}
      </Grid2>

      <Pagination count={10} color="primary" sx={{ mt: 8, mx: "auto" }} />

      <AddProductDialog
        open={openAddDialog}
        onClose={() => {
          setOpenAddDialog(false);
        }}
        onCreate={() => {}}
      />
    </DashboardContent>
  );
}
