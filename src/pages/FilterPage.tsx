import { Box, Grid, Typography } from "@mui/material";
import CardComponent from "../components/CardComponent";
import LayoutFilter from "../components/layouts/LayoutFilter";
import { useEffect, useRef, useState } from "react";
import PaginationComponent from "../components/PaginationComponent";
import SpinnerFullScreen from "../components/SpinnerFullScreen";
import { useDispatch, useSelector } from "react-redux";
import { filterAsync } from "../stores/actions/filterAction";
import { AppDispatch, RootState } from "../stores/store";
import { Helmet } from "react-helmet";

export const PERPAGE_OPITONS = [6, 12, 18, 24];

const FilterPage = () => {
  const [currentPage, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PERPAGE_OPITONS[0]);
  const dispatch: AppDispatch = useDispatch();
  const { data, isLoading, totalPages, categorySlug, sort } = useSelector(
    (store: RootState) => store.filterData
  );

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
            page:currentPage,
            categorySlug,
            sort,
          })
        );
      }
    }
  }, [currentPage, perPage]);

  const renderCards = () => {
    return data?.map((item: any) => {
      return (
        <>
          <Grid item xs={4} key={item?._id}>
            <div
              style={{
                maxWidth: "22rem",
                height: "30rem",
                margin: "0 auto",
              }}
            >
              <CardComponent item={item} />
            </div>
          </Grid>
        </>
      );
    });
  };

  return (
    <>
      <Helmet>
        <title>Tất cả sản phẩm</title>
        <meta name="description" content="Trang này là nơi hiện tất cả sản phẩm, bạn có thể lọc sản phẩm ở nơi này" />
        <meta
          property="og:image"
          content="https://example.com/path-to-your-image.jpg"
        />
      </Helmet>
      {isLoading && <SpinnerFullScreen />}
      <LayoutFilter>
        {data?.length > 0 ? (
          <>
            {renderCards()}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                mt: 2,
              }}
            >
              <PaginationComponent
                page={currentPage || 0}
                totalPages={totalPages || 0}
                setPerpage={setPerPage}
                setPage={setPage}
                perPage={perPage}
              />
            </Box>
          </>
        ) : (
          <>
            <Typography textAlign={"center"} fontWeight={"bold"}>
              Không có sản phẩm
            </Typography>
          </>
        )}
      </LayoutFilter>
    </>
  );
};

export default FilterPage;
