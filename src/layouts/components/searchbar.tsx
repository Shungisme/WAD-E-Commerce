import {
  alpha,
  Box,
  BoxProps,
  Button,
  ClickAwayListener,
  IconButton,
  Input,
  InputAdornment,
  Slide,
  useTheme,
} from "@mui/material";
import { useCallback, useState } from "react";
import { Iconify } from "../../components/iconify";
import { bgBlur } from "../../theme/styles";

export const Searchbar = ({ sx, ...other }: BoxProps) => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" />
          </IconButton>
        )}

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <Box
            sx={{
              ...bgBlur({
                color: theme.palette.background.default,
              }),
              top: 0,
              left: 0,
              zIndex: 99,
              width: "100%",
              display: "flex",
              position: "absolute",
              alignItems: "center",
              px: {
                xs: 3,
                md: 5,
              },
              boxShadow: theme.customShadows.z8,
              height: {
                xs: 64,
                md: 72,
              },
              ...sx,
            }}
            {...other}
          >
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
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
              sx={{ fontWeight: "fontWeightBold" }}
            />

            <Button variant="contained" onClick={handleClose}>
              Search
            </Button>
          </Box>
        </Slide>
      </div>
    </ClickAwayListener>
  );
};
