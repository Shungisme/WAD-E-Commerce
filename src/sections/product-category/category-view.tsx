import React, { useCallback, useMemo, useState } from "react";
import { useTable } from "../use-table";
import { DashboardContent } from "../../layouts/dashboard/main";
import { Box } from "@mui/system";
import {
  Button,
  Card,
  SelectChangeEvent,
  Snackbar,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from "@mui/material";
import { Iconify } from "../../components/iconify/iconify";
import { CategoryProps, CategoryTableRow } from "./category-table-row";
import { applyFilter } from "./utils";
import { emptyRows, getComparator } from "../account/utils";
import { CategoryTableToolbar } from "./category-table-toolbar";
import { Scrollbar } from "../../components/scrollbar/scrollbar";
import { CategoryTableHead } from "./category-table-head";
import { TableEmptyRows } from "../account/table-empty-rows";
import { TableNoData } from "../account/table-no-data";
import AddCategoryDialog from "./add-category-dialog";
import DeleteCategoriesDialog from "./delete-categories-dialog";
import useCategoriesAdmin from "../../hooks/use-categories-admin";
import SpinnerFullScreen from "../../components/SpinnerFullScreen";

export function CategoryView() {
  const {
    getCategories,
    addCategory,
    deleteCategories,
    updateCategory,
    deleteCategory,
  } = useCategoriesAdmin();

  const table = useTable("title");

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState("");

  const [filterTitle, setFilterTitle] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseSnackbar = useCallback(() => {
    setOpenSnackbar(false);
  }, []);

  const filter = useMemo(
    () => [
      {
        key: "title" as keyof CategoryProps,
        value: filterTitle,
      },
      {
        key: "status" as keyof CategoryProps,
        value: filterStatus,
      },
    ],
    [filterTitle, filterStatus]
  );

  const dataFiltered: CategoryProps[] = useMemo(
    () =>
      applyFilter({
        inputData: getCategories?.data ?? [],
        comparator: getComparator(table.order, table.orderBy),
        filter: filter,
      }),
    [getCategories?.data, table.order, table.orderBy, filter]
  );

  const notFound = !dataFiltered.length && !!filterTitle;

  return (
    <>
      {isLoading && <SpinnerFullScreen />}

      <DashboardContent>
        <Box display="flex" alignItems="center" mb={5}>
          <Typography variant="h4" flexGrow={1}>
            Product Categories
          </Typography>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={() => setOpenAddDialog(true)}
          >
            New Category
          </Button>
        </Box>

        <Card>
          <CategoryTableToolbar
            numSelected={table.selected.length}
            filterTitle={filterTitle}
            onFilterTitle={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFilterTitle(event.target.value)
            }
            filterStatus={filterStatus}
            onFilterStatus={(event: SelectChangeEvent<string>) =>
              setFilterStatus(event.target.value)
            }
            onOpenDeleteDialog={() => setOpenDeleteDialog(true)}
          />

          <Scrollbar>
            <TableContainer
              sx={{
                overflow: "unset",
              }}
            >
              <Table sx={{ minWidth: 800 }}>
                <CategoryTableHead
                  orderBy={table.orderBy}
                  order={table.order}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) => {
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((category) => category._id)
                    );
                  }}
                  headLabel={[
                    { id: "title", label: "Title" },
                    { id: "parentSlug", label: "Parent Slug" },
                    { id: "status", label: "Status" },
                    { id: "timestamps", label: "Timestamps" },
                    { id: "action", label: "" },
                  ]}
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <CategoryTableRow
                        key={row._id}
                        row={row}
                        selected={
                          !!row?._id && table.selected.includes(row?._id)
                        }
                        onSelectRow={() =>
                          !!row?._id && table.onSelectRow(row?._id)
                        }
                        onEditRow={async (category: CategoryProps) => {
                          try {
                            setIsLoading(true);
                            await updateCategory?.mutateAsync({
                              category: category,
                            });
                            setMessageSnackbar("Category updated successfully");
                          } catch (error) {
                            console.log(error);
                            setMessageSnackbar("Error updating category");
                          } finally {
                            setIsLoading(false);
                            setOpenSnackbar(true);
                          }
                        }}
                        onDeleteRow={async (category: CategoryProps) => {
                          try {
                            if (!category._id) return;

                            setIsLoading(true);
                            await deleteCategory?.mutateAsync({
                              categoryId: category._id,
                            });

                            setMessageSnackbar("Category deleted successfully");
                          } catch (error) {
                            setMessageSnackbar("Error deleting category");
                          } finally {
                            setIsLoading(false);
                            setOpenSnackbar(true);
                          }
                        }}
                      />
                    ))}

                  <TableEmptyRows
                    height={68}
                    emptyRows={emptyRows(
                      table.page,
                      table.rowsPerPage,
                      dataFiltered.length
                    )}
                  />

                  {notFound && <TableNoData searchQuery={filterTitle} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            component="div"
            page={table.page}
            count={dataFiltered.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            showFirstButton
            showLastButton
          />
        </Card>

        <AddCategoryDialog
          open={openAddDialog}
          onClose={() => {
            setOpenAddDialog(false);
          }}
          onCreate={async (category: CategoryProps) => {
            try {
              setIsLoading(true);
              await addCategory?.mutateAsync({ category });
              setMessageSnackbar("Category created successfully");
            } catch (error) {
              setMessageSnackbar("Error creating category");
            } finally {
              setIsLoading(false);
              setOpenSnackbar(true);
            }
          }}
        />

        <DeleteCategoriesDialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onDelete={async () => {
            try {
              setIsLoading(true);
              await deleteCategories?.mutateAsync({
                categoryIds: table.selected,
              });
              setMessageSnackbar("Category deleted successfully");
              setOpenDeleteDialog(false);
              table.onSelectAllRows(false, []);
            } catch (error) {
              setMessageSnackbar("Error deleting category");
            } finally {
              setIsLoading(false);
              setOpenSnackbar(true);
            }
          }}
          numCategory={table.selected.length}
        />

        <Snackbar
          open={openSnackbar}
          message={messageSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        />
      </DashboardContent>
    </>
  );
}
