import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ReactNode, useEffect, useRef, useState } from "react";
import IconifyIcon from "../components/iconifyIcon";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getAllCategories } from "../services/categories";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../stores/store";
import SpinnerFullScreen from "../components/SpinnerFullScreen";
import { filterAsync } from "../stores/actions/filterAction";
import Fade from "@mui/material/Fade";
import { slugify } from "../utils/slugify";
import { useSearchParams } from "react-router-dom";
import { PERPAGE_OPITONS } from "../pages/FilterPage";
import PaginationComponent from "../components/PaginationComponent";

interface TProps {
  children: ReactNode;
  filterQuery?: UseQueryResult<any, Error>;
}

const LayoutFilter = ({ children }: TProps) => {
  const [currentPage, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PERPAGE_OPITONS[0]);
  const [hideFilter, setHideFilter] = useState<boolean>(true);
  const [showCategory, setShowCategory] = useState<Record<string, boolean>>({});
  const [content, setContent] = useState<string>("");
  const [sort, setSort] = useState<"newest" | "oldest" | "asc" | "desc">();
  const [searchParams] = useSearchParams();

  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, limit, categorySlug, totalPages, data } = useSelector(
    (store: RootState) => store.filterData
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    const value = event.currentTarget.getAttribute("data-value");
    if (
      value === "newest" ||
      value === "oldest" ||
      value === "asc" ||
      value === "desc"
    ) {
      setSort(value);
    }
    setAnchorEl(null);
  };

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 5 * 60 * 1000,
  });

  const renderCategories = () => {
    return categories?.data?.megaMenuTitle?.map((item: any, index: number) => {
      return (
        <>
          <Box
            key={"category" + index}
            onClick={() =>
              setShowCategory((prev) => ({
                [item[0]]: !prev[item[0]],
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
                backgroundColor: theme.palette.primary.main,
              },
            }}
          >
            <Typography>{item[0]}</Typography>
            <IconifyIcon icon={"mingcute:down-line"} />
          </Box>

          {showCategory[item[0]] && (
            <Box
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
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setContent(slugify((event.target as HTMLInputElement).value))
                }
              >
                {item[1] &&
                  item[1].map((item: any, index: number) => {
                    return (
                      <>
                        <FormControlLabel
                          key={"cateChild" + index}
                          value={item}
                          control={
                            <Radio checked={categorySlug === slugify(item)} />
                          }
                          label={item}
                        />
                      </>
                    );
                  })}
              </RadioGroup>
            </Box>
          )}

          {index !== categories?.data?.megaMenuTitle?.length - 1 && <Divider />}
        </>
      );
    });
  };

  const comeClearFilter = useRef<boolean>(false);
  const clearFilter = async () => {
    await dispatch(
      filterAsync({
        categorySlug: "",
        limit: PERPAGE_OPITONS[0],
        page: 1,
        search: "",
        sort: "",
        status: "active",
      })
    );
    setPage(1);
    comeClearFilter.current = true;
  };

  const firstRender = useRef(false);
  const comeFilter = useRef(false);
  useEffect(() => {
    if (firstRender.current === false) {
      firstRender.current = true;
      return;
    } else {
      comeFilter.current = true;
      dispatch(
        filterAsync({
          categorySlug: content || "",
          sort,
          page: 1,
          limit,
          status: "active",
        })
      );
      setPage(1);
    }
  }, [sort, content]);

  useEffect(() => {
    const contentParam = searchParams.get("content") as string;
    setContent(contentParam);
    if (contentParam) {
      categories?.data?.megaMenuTitle?.forEach((item: any) => {
        for (let cate of item[1]) {
          if (slugify(cate) === contentParam) {
            setShowCategory((prev) => ({
              [item[0]]: true,
            }));
          }
        }
      });
    }
  }, [searchParams]);

  const first = useRef<boolean>(false);
  useEffect(() => {
    if (first.current === false) {
      first.current = true;
      return;
    } else {
      if (!isLoading) {
        dispatch(
          filterAsync({
            limit: perPage,
            page: currentPage,
            categorySlug,
            sort,
            status: "active",
          })
        );
      }
    }
  }, [currentPage, perPage]);

  return (
    <>
      {isLoading && <SpinnerFullScreen />}
      <Box
        sx={{
          maxWidth: "90%",
          margin: "0 auto",
          mt: "2rem",
          minHeight: "33rem",
        }}
      >
        <Grid container rowGap={3} columnGap={5}>
          <Grid xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
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
                  onClick={async () => setHideFilter(!hideFilter)}
                >
                  <Typography>{!hideFilter ? "Hiện lọc" : "Ẩn lọc"}</Typography>
                  <IconifyIcon icon={"rivet-icons:filter"} />
                </Box>
                <Button onClick={clearFilter} variant="contained">
                  Xóa lọc
                </Button>
                <Box>
                  <Button
                    id="fade-button"
                    aria-controls={open ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    variant="contained"
                  >
                    Sắp xếp
                  </Button>

                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    <MenuItem data-value="newest" onClick={handleClose}>
                      Mới nhất
                    </MenuItem>
                    <MenuItem data-value="oldest" onClick={handleClose}>
                      Cũ nhất
                    </MenuItem>
                    <MenuItem data-value="desc" onClick={handleClose}>
                      Giá cao
                    </MenuItem>
                    <MenuItem data-value="asc" onClick={handleClose}>
                      Giá thấp
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid xs={2.5}>
            {hideFilter && (
              <Box
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
              >
                <Stack direction={"column"} gap={1}>
                  {renderCategories()}
                </Stack>
              </Box>
            )}
          </Grid>

          <Grid
            key={hideFilter ? "filter-visible" : "filter-hidden"}
            xs={hideFilter ? 9 : 12}
            width={"100%"}
            height={"100%"}
            justifyContent={"center"}
          >
            <Grid
              spacing={1.5}
              container
              width={"100%"}
              justifyContent={"flex-start"}
              alignContent={"center"}
              alignItems={"center"}
            >
              {children}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                  mt: 2,
                }}
              >
                {data.length > 0 && (
                  <PaginationComponent
                    page={currentPage || 0}
                    totalPages={totalPages || 0}
                    setPerpage={setPerPage}
                    setPage={setPage}
                    perPage={perPage}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LayoutFilter;
