import { Box } from "@mui/material";
import MainCarousel from "./ForBody/MainCarousel";
import InformationComponent from "./ForBody/Information";
import SmallCarousel from "../SmallCarouselComponent";
import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "../../services/products";

const BodyHomeComponent = () => {
  const shoesProducts = useQuery({
    queryKey: ["shoes-carousel"],
    queryFn: async () => {
      const response = await getProductsByCategory({
        categorySlug: "san-pham-giay",
        page: 1,
        limit: 6,
      });
      return response;
    },
    staleTime: 1000 * 60 * 5,
  });

  const shirtProducts = useQuery({
    queryKey: ["shirt-carousel"],
    queryFn: async () => {
      const response = await getProductsByCategory({
        categorySlug: "san-pham-ao",
        page: 1,
        limit: 6,
      });
      return response;
    },
    staleTime: 1000 * 60 * 5,
  });

  const trousersProducts = useQuery({
    queryKey: ["trousers-carousel"],
    queryFn: async () => {
      const response = await getProductsByCategory({
        categorySlug: "san-pham-quan",
        page: 1,
        limit: 6,
      });
      return response;
    },
    staleTime: 1000 * 60 * 5,
  });

  const accessoriesProducts = useQuery({
    queryKey: ["accessories-carousel"],
    queryFn: async () => {
      const response = await getProductsByCategory({
        categorySlug: "phu-kien",
        page: 1,
        limit: 6,
      });
      return response;
    },
    staleTime: 1000 * 60 * 5,
  });

  const presentsProducts = useQuery({
    queryKey: ["presents-carousel"],
    queryFn: async () => {
      const response = await getProductsByCategory({
        categorySlug: "qua-luu-niem",
        page: 1,
        limit: 6,
      });
      return response;
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
        }}
      >
        <MainCarousel />
        <InformationComponent />
        <Box sx={{ width: "100%" }}>
          <SmallCarousel
            items={shoesProducts?.data?.products}
            type="Sản phẩm giày"
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <SmallCarousel
            items={shirtProducts?.data?.products}
            type="Sản phẩm áo"
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <SmallCarousel
            items={trousersProducts?.data?.products}
            type="Sản phẩm quần"
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <SmallCarousel
            items={accessoriesProducts?.data?.products}
            type="Phụ kiện"
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <SmallCarousel
            items={presentsProducts?.data?.products}
            type="Quà lưu niệm"
          />
        </Box>
      </Box>
    </>
  );
};

export default BodyHomeComponent;
