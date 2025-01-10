import React, { useState, useCallback, useRef, useEffect } from "react";

import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { FiltersProps, ProductFilters } from "../product-filters";
import { DashboardContent } from "../../../layouts/dashboard/main";
import { ProductSort } from "../product-sort";
import { ProductItem, ProductItemProps } from "../product-item";
import {
  Button,
  FormControl,
  Grid2,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { Iconify } from "../../../components/iconify/iconify";
import AddProductDialog from "../add-product-dialog";
import { AppDispatch, RootState } from "../../../stores/store";
import { useDispatch, useSelector } from "react-redux";
import { filterAsync } from "../../../stores/actions/filterAction";
import SpinnerFullScreen from "../../../components/SpinnerFullScreen";
import useProductsAdmin from "../../../hooks/use-products-admin";
import { createProductAsync } from "../../../stores/actions/create-product-action";

export const PER_PAGE_OPTIONS = [8, 16, 24, 32];

const defaultFilters = {
  limit: PER_PAGE_OPTIONS[0],
  page: 1,
  categorySlug: "",
  sort: "",
  search: "",
};

export function ProductsView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(PER_PAGE_OPTIONS[0]);
  const [categorySlug, setCategorySlug] = useState("");
  const [filters, setFilters] = useState<FiltersProps>(defaultFilters);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const { getMegaMenuCategories } = useProductsAdmin();

  const dispatch: AppDispatch = useDispatch();
  const {
    data: products,
    isLoading,
    totalPages,
    sort,
  } = useSelector((store: RootState) => store.filterData);

  useEffect(() => {
    if (!isLoading) {
      dispatch(
        filterAsync({
          limit: perPage,
          page: currentPage,
          categorySlug,
          sort,
        })
      );
    }
  }, [currentPage, perPage]);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPage(1);
      dispatch(
        filterAsync({
          limit: perPage,
          page: 1,
          categorySlug,
          sort,
          search: event.target.value,
        })
      );
    },
    [perPage, categorySlug, sort]
  );

  const handleOpenFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

  const handleSort = useCallback((newSort: any) => {
    dispatch(
      filterAsync({
        limit: perPage,
        page: currentPage,
        categorySlug,
        sort: newSort,
      })
    );
  }, []);

  const handleSetFilters = useCallback((updateState: Partial<FiltersProps>) => {
    dispatch(
      filterAsync({
        limit: perPage,
        page: 1,
        categorySlug,
        sort,
        ...updateState,
      })
    );
    setFilters((prevValue) => ({ ...prevValue, ...updateState }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setCurrentPage(1);
    setCategorySlug("");
    setFilters(defaultFilters);
    setPerPage(PER_PAGE_OPTIONS[0]);
    dispatch(
      filterAsync({
        limit: PER_PAGE_OPTIONS[0],
        page: 1,
        categorySlug: "",
        sort: "",
        search: "",
      })
    );
  }, []);

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value);
    },
    []
  );

  const handlePerPageChange = useCallback((event: SelectChangeEvent) => {
    setPerPage(Number(event.target.value));
  }, []);

  const canReset = Object.keys(filters).some(
    (key) =>
      filters[key as keyof FiltersProps] !==
      defaultFilters[key as keyof FiltersProps]
  );

  const handleAddProduct = useCallback(
    (product: Partial<ProductItemProps>) => {
      setOpenAddDialog(false);
      dispatch(createProductAsync(product))
        .then(() => setIsAdding(false))
        .catch(() => setIsAdding(false));
    },
    [dispatch]
  );

  return (
    <>
      {(isLoading || isAdding) && <SpinnerFullScreen />}
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
          gap={1}
          display="flex"
          alignItems="center"
          flexWrap="wrap-reverse"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <OutlinedInput
            fullWidth
            placeholder="Search product…"
            onChange={handleSearch}
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
              onResetFilter={handleResetFilters}
              options={{
                categories: getMegaMenuCategories?.data,
              }}
            />

            <ProductSort
              sort={sort}
              onSort={handleSort}
              options={[
                { value: "oldest", label: "Oldest" },
                { value: "newest", label: "Newest" },
                { value: "desc", label: "Price: High-Low" },
                { value: "asc", label: "Price: Low-High" },
              ]}
            />
          </Box>
        </Box>
        <Grid2 container spacing={3}>
          {products.map((product: any) => (
            <Grid2
              key={product?._id}
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}
            >
              <ProductItem product={product} setIsAdding={setIsAdding} />
            </Grid2>
          ))}
        </Grid2>

        <Stack direction="row" alignItems="center" sx={{ mt: 8, mx: "auto" }}>
          <Box sx={{ minWidth: 80 }}>
            <FormControl fullWidth>
              <Select value={perPage.toString()} onChange={handlePerPageChange}>
                {PER_PAGE_OPTIONS.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Pagination
            color="primary"
            page={currentPage}
            count={totalPages}
            onChange={handlePageChange}
            defaultPage={1}
          />
        </Stack>

        <AddProductDialog
          setIsLoading={setIsAdding}
          open={openAddDialog}
          onClose={() => {
            setOpenAddDialog(false);
          }}
          onCreate={handleAddProduct}
        />
      </DashboardContent>
    </>
  );
}
