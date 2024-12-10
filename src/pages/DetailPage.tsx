import { Box, Container, Typography } from "@mui/material";
import { DETAIL_PRODUCT } from "../mocks/detailProduct";
import CustomPaging from "../components/DetailComponent/CustomPaging";
import InformationComponent from "../components/HomeComponent/ForBody/Information";
import DetailProductComponent from "../components/DetailComponent/DetailProductComponent";
import SmallCarousel from "../components/SmallCarouselComponent";

const DetailPage = () => {
  const product = DETAIL_PRODUCT;

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
          <CustomPaging item={product} />
          <DetailProductComponent item={product} />
        </Box>
        <Box mt={"2rem"}>
          <Typography sx={{
            fontSize:"2rem",
            fontWeight:"bold",
            textAlign:"left",
            mb:2
          }}>Sản phẩm liên quan</Typography>
           ....
        </Box>
      </Box>
    </>
  );
};

export default DetailPage;
