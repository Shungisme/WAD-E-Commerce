import { Box, useTheme } from "@mui/material";
import { PRODUCT } from "../../types/productType";
import { useState } from "react";

interface TProps {
  item: PRODUCT;
}

const CustomPaging = ({ item }: TProps) => {
  const [heroImage, setHeroImage] = useState<string>(item?.thumbnail);
  const theme = useTheme();

  const renderListImages = () => {
    return item?.images?.map((item, index) => {
      return (
        <>
          <Box
            onClick={() => setHeroImage(item)}
            sx={{
              width: "5rem",
              height: "5rem",
              objectFit: "cover",
              cursor: "pointer",
              borderRadius: "5px",
              boxShadow: `rgba(0, 0, 0, 0.24) 0px 3px 3px`,
            }}
            key={index + "customPaging"}
            component={"img"}
            src={item}
          />
        </>
      );
    });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 5,
          width: "50%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            maxHeight: "40rem",
            overflow: "auto",
          }}
        >
          {renderListImages()}
        </Box>

        <Box
          sx={{
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "40rem",
              objectFit: "cover",
              borderRadius: "5px",
              boxShadow: `rgba(0, 0, 0, 0.24) 0px 3px 3px`,
            }}
            alt={item?.title}
            component={"img"}
            src={heroImage}
          />

          {item?.discount > 0 && (
            <>
              <Box
                sx={{
                  position: "absolute",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  top: 0,
                  left: 0,
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                  p: 0.5,
                  borderRadius: "5px 0 10px 10px",
                }}
              >
                {item?.discount}%
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default CustomPaging;
