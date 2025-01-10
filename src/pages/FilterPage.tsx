import { Grid, Typography } from "@mui/material";
import CardComponent from "../components/CardComponent";
import LayoutFilter from "../layouts/LayoutFilter";
import SpinnerFullScreen from "../components/SpinnerFullScreen";
import { useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { Helmet } from "react-helmet";

export const PERPAGE_OPITONS = [6, 12, 18, 24];

const FilterPage = () => {
  const { data, isLoading } = useSelector(
    (store: RootState) => store.filterData
  );

  const renderCards = () => {
    return data?.map((item: any) => {
      return (
        <>
          <Grid item xs={4} key={item?._id}>
            <div
              style={{
                maxWidth: "22rem",
                height: "34rem",
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
        <meta
          name="description"
          content="Trang này là nơi hiện tất cả sản phẩm, bạn có thể lọc sản phẩm ở nơi này"
        />
        <meta
          property="og:image"
          content="https://example.com/path-to-your-image.jpg"
        />
      </Helmet>
      {isLoading && <SpinnerFullScreen />}
      <LayoutFilter>
        {data?.length > 0 ? (
          <>{renderCards()}</>
        ) : (
          <>
            <Typography textAlign={"center"} width={"100%"} fontWeight={"bold"}>
              Không có sản phẩm
            </Typography>
          </>
        )}
      </LayoutFilter>
    </>
  );
};

export default FilterPage;
