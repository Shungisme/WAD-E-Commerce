import { Box, Typography } from "@mui/material";
import CustomPaging from "../components/DetailComponent/CustomPaging";
import DetailProductComponent from "../components/DetailComponent/DetailProductComponent";
import SmallCarousel from "../components/SmallCarouselComponent";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getProductBySlug, getProductsByCategory } from "../services/products";
import { slugify } from "../utils/slugify";
import { Helmet } from "react-helmet";
import SpinnerFullScreen from "../components/SpinnerFullScreen";

const DetailPage = () => {
  const [searchParams] = useSearchParams();

  const detailProduct = useQuery({
    queryKey: ["detail-product", searchParams.get("content")],
    queryFn: async () => {
      const response = await getProductBySlug(
        String(searchParams.get("content"))
      );
      return response;
    },
    enabled: !!searchParams.get("content"),
  });

  const relatedProducts = useQuery({
    queryKey: [
      "related-product",
      detailProduct?.data?.categoryTitle,
      searchParams.get("content"),
    ],
    queryFn: async () => {
      const response = await getProductsByCategory({
        categorySlug: slugify(detailProduct?.data.categoryTitle),
        limit: 6,
        page: 1,
      });

      return response;
    },
    enabled: !!detailProduct?.data?.categoryTitle,
  });

  return (
    <>
      <Helmet>
        <title>Chi tiết sản phẩm</title>
        <meta name="description" content="Trang này hiển thị chi tiết sản phẩm" />
        <meta
          property="og:image"
          content="https://example.com/path-to-your-image.jpg"
        />
      </Helmet>
      {detailProduct.isFetching && <SpinnerFullScreen/>}
      <Box
        sx={{
          margin: "0 auto",
          mt: 5,
        }}
      >
        <Box
          sx={{
            maxWidth: "80%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <CustomPaging item={detailProduct?.data} />
          <DetailProductComponent item={detailProduct?.data} />
        </Box>
        <Box mt={"2rem"}>
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "left",
              mb: 2,
              maxWidth: "90%",
              margin: "0 auto",
            }}
          >
            Sản phẩm liên quan
          </Typography>
          <Box width={"100%"}>
            <SmallCarousel
              items={relatedProducts?.data?.products.filter(
                (item: any) => item?._id !== detailProduct?.data._id
              )}
              type={detailProduct?.data?.categoryTitle}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DetailPage;
