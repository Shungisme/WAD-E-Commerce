import React, { useMemo, useState } from "react";
import { useTable } from "../use-table";
import { AccountProps, AccountTableRow } from "../account-table-row";
import { applyFilter, getComparator, emptyRows } from "../utils";
import { _users } from "../../../mocks/_data";
import { DashboardContent } from "../../../layouts/dashboard/main";
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
import { Iconify } from "../../../components/iconify/iconify";
import { AccountTableToolbar } from "../account-table-toolbar";
import { Scrollbar } from "../../../components/scrollbar/scrollbar";
import { AccountTableHead } from "../account-table-head";
import { TableEmptyRows } from "../table-empty-rows";
import { TableNoData } from "../table-no-data";
import AddAccountDialog from "../add-account-dialog";
import DeleteAccountsDialog from "../delete-accounts-dialog";

export function AccountView() {
  const table = useTable();

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterRole, setFilterRole] = useState("");

  const filter = useMemo(
    () => [
      {
        key: "name" as keyof AccountProps,
        value: filterName,
      },
      {
        key: "status" as keyof AccountProps,
        value: filterStatus,
      },
      {
        key: "role" as keyof AccountProps,
        value: filterRole,
      },
    ],
    [filterName, filterStatus, filterRole]
  );

  const dataFiltered: AccountProps[] = applyFilter({
    inputData: _users,
    comparator: getComparator(table.order, table.orderBy),
    filter: filter,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Accounts
        </Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setOpenAddDialog(true)}
        >
          New account
        </Button>
      </Box>

      <Card>
        <AccountTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
          }}
          filterStatus={filterStatus}
          onFilterStatus={(event: SelectChangeEvent<string>) => {
            setFilterStatus(event.target.value);
          }}
          filterRole={filterRole}
          onFilterRole={(event: SelectChangeEvent<string>) => {
            setFilterRole(event.target.value);
          }}
          onOpenDeleteDialog={() => setOpenDeleteDialog(true)}
        />

        <Scrollbar>
          <TableContainer
            sx={{
              overflow: "unset",
            }}
          >
            <Table
              sx={{
                minWidth: 800,
              }}
            >
              <AccountTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) => {
                  table.onSelectAllRows(
                    checked,
                    _users.map((user) => user.id)
                  );
                }}
                headLabel={[
                  { id: "name", label: "Name" },
                  { id: "email", label: "Email" },
                  { id: "role", label: "Role" },
                  { id: "status", label: "Status" },
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
                    <AccountTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onEditRow={(account: AccountProps) => {
                        console.log(account);
                      }}
                      onDeleteRow={(account: AccountProps) => {
                        console.log(account);
                      }}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(
                    table.page,
                    table.rowsPerPage,
                    _users.length
                  )}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={_users.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
          showFirstButton
          showLastButton
        />
      </Card>

      <AddAccountDialog
        open={openAddDialog}
        onClose={() => {
          setOpenAddDialog(false);
        }}
        onCreate={() => {}}
      />

      <DeleteAccountsDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onDelete={() => {}}
        numAccount={table.selected.length}
      />
    </DashboardContent>
  );
}
