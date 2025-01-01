import { Box } from "@mui/material";
import BodyHomeComponent from "../components/HomeComponent/BodyHomeComponent";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
        <meta name="description" content="Nơi này hiển thị trang chủ" />
        <meta
          property="og:image"
          content="https://example.com/path-to-your-image.jpg"
        />
      </Helmet>
      <Box>
        <BodyHomeComponent />
      </Box>
    </>
  );
};

export default HomePage;
