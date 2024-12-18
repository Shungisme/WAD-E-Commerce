import { Box, Typography } from "@mui/material";
import { DETAIL_PRODUCT } from "../mocks/detailProduct";
import CustomPaging from "../components/DetailComponent/CustomPaging";
import DetailProductComponent from "../components/DetailComponent/DetailProductComponent";
import SmallCarousel from "../components/SmallCarouselComponent";
import { BEST_SELLER } from "../mocks/bestSeller";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getProductBySlug, getProductsByCategory } from "../services/products";
import { slugify } from "../utils/slugify";

const DetailPage = () => {
  const [searchParams] = useSearchParams();
  
  const detailProduct = useQuery({
    queryKey:['detail-product'],
    queryFn: async () => {
      const response = await getProductBySlug(String(searchParams.get('content'))); 
      console.log(response);
      return response
    },
    enabled: !!searchParams.get('content') 
  })

  
  const relatedProducts = useQuery({
    queryKey: ["related-product", detailProduct?.data?.categoryTitle],
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
      <Box
        sx={{
          maxWidth: "80%",
          margin: "0 auto",
          mt: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <CustomPaging item={detailProduct.data} />
          <DetailProductComponent item={detailProduct.data} />
        </Box>
        <Box mt={"2rem"}>
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "left",
              mb: 2,
            }}
          >
            Sản phẩm liên quan
          </Typography>
          <SmallCarousel items={relatedProducts?.data?.products} type={detailProduct?.data?.categoryTitle} />
        </Box>
      </Box>
    </>
  );
};

export default DetailPage;
