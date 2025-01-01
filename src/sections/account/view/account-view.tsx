import React, { useCallback, useMemo, useState } from "react";
import { useTable } from "../../use-table";
import { AccountProps, AccountTableRow } from "../account-table-row";
import { applyFilter, getComparator, emptyRows } from "../utils";
import { DashboardContent } from "../../../layouts/dashboard/main";
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
import { Iconify } from "../../../components/iconify/iconify";
import { AccountTableToolbar } from "../account-table-toolbar";
import { Scrollbar } from "../../../components/scrollbar/scrollbar";
import { AccountTableHead } from "../account-table-head";
import { TableEmptyRows } from "../table-empty-rows";
import { TableNoData } from "../table-no-data";
import AddAccountDialog from "../add-account-dialog";
import DeleteAccountsDialog from "../delete-accounts-dialog";
import useAccountsAdmin from "../../../hooks/use-accounts-admin";

export function AccountView() {
  const {
    getAccounts,
    addAccount,
    deleteAccounts,
    updateAccount,
    deleteAccount,
  } = useAccountsAdmin();

  const table = useTable("name");

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState("");

  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterRole, setFilterRole] = useState("");

  const handleCloseSnackbar = useCallback(() => {
    setOpenSnackbar(false);
  }, []);

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
    inputData: getAccounts?.data ?? [],
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
                rowCount={getAccounts?.data?.length ?? 0}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) => {
                  table.onSelectAllRows(
                    checked,
                    getAccounts?.data?.map((account) => account._id) ?? []
                  );
                }}
                headLabel={[
                  { id: "name", label: "Name" },
                  { id: "email", label: "Email" },
                  { id: "role", label: "Role" },
                  { id: "status", label: "Status" },
                  { id: "all", label: "" },
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
                      key={row._id}
                      row={row}
                      selected={!!row?._id && table.selected.includes(row?._id)}
                      onSelectRow={() =>
                        !!row?._id && table.onSelectRow(row?._id)
                      }
                      onEditRow={(account: AccountProps) => {
                        try {
                          updateAccount?.mutateAsync({ account });
                          console.log("onEditRow: update account", account);
                          setMessageSnackbar("Account updated successfully");
                        } catch (error) {
                          console.log(error);
                          setMessageSnackbar("Error updating account");
                        }
                        setOpenSnackbar(true);
                      }}
                      onDeleteRow={(account: AccountProps) => {
                        try {
                          if (!account?._id) return;
                          deleteAccount?.mutateAsync({ userId: account._id });
                          setMessageSnackbar("Account deleted successfully");
                        } catch (error) {
                          console.log(error);
                          setMessageSnackbar("Error deleting account");
                        }
                        setOpenSnackbar(true);
                      }}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(
                    table.page,
                    table.rowsPerPage,
                    getAccounts?.data?.map((account) => account._id).length ?? 0
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
          count={getAccounts?.data?.map((account) => account._id).length ?? 0}
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
        onCreate={async (account: AccountProps) => {
          try {
            await addAccount?.mutateAsync({ account });
            console.log("onCreate: add account", account);
            setMessageSnackbar("Account created successfully");
          } catch (error) {
            console.log(error);
            setMessageSnackbar("Error creating account");
          }
          setOpenSnackbar(true);
        }}
      />

      <DeleteAccountsDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onDelete={() => {
          try {
            deleteAccounts?.mutateAsync({ userIds: table.selected });
            setMessageSnackbar("Accounts deleted successfully");
            setOpenDeleteDialog(false);
            table.onSelectAllRows(false, []);
          } catch (error) {
            console.log(error);
            setMessageSnackbar("Error deleting accounts");
          }
          setOpenSnackbar(true);
        }}
        numAccount={table.selected.length}
      />

      <Snackbar
        open={openSnackbar}
        message={messageSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      />
    </DashboardContent>
  );
}
