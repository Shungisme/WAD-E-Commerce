import {
  Box,
  Button,
  Checkbox,
  ClickAwayListener,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ReactNode, useEffect, useRef, useState } from "react";
import { CATEGORIES_CONTANT } from "../../constants/categoryContants";
import IconifyIcon from "../iconifyIcon";
import { motion, AnimatePresence } from "framer-motion";

interface TProps {
  children: ReactNode;
}

const LayoutFilter = ({ children }: TProps) => {
  const theme = useTheme();
  const [hideFilter, setHideFilter] = useState<boolean>(true);
  const category = CATEGORIES_CONTANT;
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [showCategory, setShowCategory] = useState<Record<string, boolean>>({});

  useEffect(() => {
    category().reduce((curr, currentVal) => {
      curr[currentVal.parent] = false;
      return curr;
    }, {} as Record<string, boolean>);
  }, []);

  const renderCategories = () => {
    return category().map((item, index) => {
      return (
        <>
          <Box
            key={index}
            onClick={() =>
              setShowCategory((prev) => ({
                ...prev,
                [item.parent]: !prev[item.parent],
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
            <Typography>{item?.parent}</Typography>
            <IconifyIcon icon={"mingcute:down-line"} />
          </Box>
          <AnimatePresence mode="wait">
            {showCategory[item.parent] && (
              <motion.div
                initial={{ y: "-20%", opacity: 0 }}
                animate={{ y: "0", opacity: 1 }}
                exit={{ y: "-20%", opacity: 0 }}
                transition={{ duration: 0.3 }}
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
                <FormGroup>
                  {item.child &&
                    item.child.map((item, index) => {
                      return (
                        <>
                          <FormControlLabel
                            key={index}
                            control={<Checkbox />}
                            label={item.name}
                          />
                        </>
                      );
                    })}
                </FormGroup>
              </motion.div>
            )}
          </AnimatePresence>

          {index !== category().length - 1 && <Divider />}
        </>
      );
    });
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Box
        sx={{
          maxWidth: "90%",
          margin: "0 auto",
          mt: "2rem",
          minHeight: "33rem",
        }}
      >
        <Grid container spacing={1} rowGap={2}>
          <Grid xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                fontWeight={"bold"}
                fontSize={"1.2rem"}
                letterSpacing={"2px"}
              >
                {"PRODUCT"}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={async () => await setHideFilter(!hideFilter)}
                >
                  <Typography>{!hideFilter ? "Hiện lọc" : "Ẩn lọc"}</Typography>
                  <IconifyIcon icon={"rivet-icons:filter"} />
                </Box>
                <Box>
                  <Button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? "composition-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    variant="contained"
                  >
                    Sắp xếp
                  </Button>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                    sx={{
                        zIndex:2
                    }}
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom-start"
                              ? "left top"
                              : "left bottom",
                           
                        }}
                      >
                        <Paper >
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              id="composition-menu"
                              aria-labelledby="composition-button"
                              onKeyDown={handleListKeyDown}
                              
                            >
                              <MenuItem onClick={handleClose}>
                                Mới nhất
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                Giá tăng
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                Giá giảm
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid xs={3}>
            <AnimatePresence>
              {hideFilter && (
                <motion.div
                  style={{
                    padding: "0.7rem",
                    maxHeight: "40rem",
                    overflow: "auto",
                    boxShadow: `${
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.24)"
                        : "rgba(0, 0, 0, 0.24)"
                    } 0px 3px 8px`,
                  }}
                  initial={{
                    x: "-100%",
                    opacity: 0,
                  }}
                  animate={{
                    x: "0",
                    opacity: 1,
                  }}
                  exit={{
                    x: "-100%",
                    opacity: 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Stack direction={"column"} gap={1}>
                    {renderCategories()}
                  </Stack>
                </motion.div>
              )}
            </AnimatePresence>
          </Grid>

          <AnimatePresence mode="wait">
            <Grid
              key={hideFilter ? "filter-visible" : "filter-hidden"}
              xs={hideFilter ? 9 : 12}
              component={motion.div}
              layout
              initial={{ opacity: 0, x: hideFilter ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: hideFilter ? 10 : -10 }}
            >
              <Grid spacing={1.5} container>
                {children}
              </Grid>
            </Grid>
          </AnimatePresence>
        </Grid>
      </Box>
    </>
  );
};

export default LayoutFilter;
