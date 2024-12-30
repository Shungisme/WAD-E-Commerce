import React, { useMemo, useState } from "react";
import { useTable } from "../use-table";
import { DashboardContent } from "../../layouts/dashboard/main";
import { Box } from "@mui/system";
import {
  Button,
  Card,
  SelectChangeEvent,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from "@mui/material";
import { Iconify } from "../../components/iconify/iconify";
import { CategoryProps, CategoryTableRow } from "./category-table-row";
import { applyFilter } from "./utils";
import { _categories } from "../../mocks/_data";
import { emptyRows, getComparator } from "../account/utils";
import { CategoryTableToolbar } from "./category-table-toolbar";
import { Scrollbar } from "../../components/scrollbar/scrollbar";
import { CategoryTableHead } from "./category-table-head";
import { TableEmptyRows } from "../account/table-empty-rows";
import { TableNoData } from "../account/table-no-data";
import AddCategoryDialog from "./add-category-dialog";
import DeleteCategoriesDialog from "./delete-categories-dialog";

export function CategoryView() {
  const table = useTable("title");

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [filterTitle, setFilterTitle] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

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

  const dataFiltered: CategoryProps[] = applyFilter({
    inputData: _categories,
    comparator: getComparator(table.order, table.orderBy),
    filter: filter,
  });

  const notFound = !dataFiltered.length && !filterTitle;

  return (
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
                rowCount={_categories.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) => {
                  table.onSelectAllRows(
                    checked,
                    _categories.map((category) => category.id)
                  );
                }}
                headLabel={[
                  { id: "title", label: "Title" },
                  { id: "parentSlug", label: "Parent Slug" },
                  { id: "status", label: "Status" },
                  { id: "timestamps", label: "Timestamps" },
                  { id: "" },
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
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onEditRow={(account: CategoryProps) => {
                        console.log(account);
                      }}
                      onDeleteRow={(account: CategoryProps) => {
                        console.log(account);
                      }}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(
                    table.page,
                    table.rowsPerPage,
                    _categories.length
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
          count={_categories.length}
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
        onCreate={() => {}}
      />

      <DeleteCategoriesDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onDelete={() => {}}
        numCategory={table.selected.length}
      />
    </DashboardContent>
  );
}
