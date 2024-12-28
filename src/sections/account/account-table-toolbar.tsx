import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Popover,
  Select,
  SelectChangeEvent,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Iconify } from "../../components/iconify/iconify";
import { useCallback, useState } from "react";

type AccountTableToolbarProps = {
  numSelected: number;
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterStatus: string;
  onFilterStatus: (event: SelectChangeEvent<string>) => void;
  filterRole: string;
  onFilterRole: (event: SelectChangeEvent<string>) => void;
};

export function AccountTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  filterStatus,
  onFilterStatus,
  filterRole,
  onFilterRole,
}: AccountTableToolbarProps) {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenFilter = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleCloseFilter = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <Toolbar
        sx={{
          height: 96,
          display: "flex",
          justifyContent: "space-between",
          p: theme.spacing(0, 1, 0, 3),
          ...(numSelected > 0 && {
            color: "primary.main",
            bgcolor: "primary.lighter",
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography component="div" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <OutlinedInput
            fullWidth
            value={filterName}
            onChange={onFilterName}
            placeholder="Search account…"
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
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton onClick={handleOpenFilter}>
              <Iconify icon="ic:round-filter-list" />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>

      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleCloseFilter}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              p: 2,
              width: 200,
              mt: 1,
            },
          },
        }}
      >
        <Stack spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              label="Status"
              onChange={onFilterStatus}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select value={filterRole} label="Role" onChange={onFilterRole}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Popover>
    </>
  );
}
