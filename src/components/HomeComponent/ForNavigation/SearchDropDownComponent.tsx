import { useQuery } from "@tanstack/react-query";
import { getProductsByFilter } from "../../../services/products";
import useDebounce from "../../../hooks/useDebounce";
import { Box, Divider, Grid, Stack, Typography, useTheme } from "@mui/material";
import { toVND } from "../../../utils/convertNumberToVND";
import { toDiscountPrice } from "../../../utils/toDiscountPrice";
import { useNavigate } from "react-router-dom";
import { slugify } from "../../../utils/slugify";

interface TProps {
  input: string;
}

const SearchDropDownComponent = ({ input }: TProps) => {
  const debounceValue = useDebounce({ value: input });
  const navigate = useNavigate();
  const theme = useTheme();

  const getSearchData = useQuery({
    queryKey: ["search-data", debounceValue],
    queryFn: async () => {
      const response = await getProductsByFilter({ search: debounceValue });
      console.log(response);
      return response;
    },
    enabled: !!debounceValue,
  });

  const renderProducts = () => {
    return getSearchData?.data?.products?.map((item: any, index: any) => {
      return (
        <>
          <Box onClick={() => navigate(`/detail?content=${slugify(item?.title)}`)} >
            <Grid
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.grey[200],
                },
                p: 1,
              }}
              container
              maxWidth={"100%"}
              key={item?._id}
            >
              <Grid item xs={3}>
                <Box
                  sx={{
                    width: "5rem",
                    height: "5rem",
                  }}
                  component={"img"}
                  src={item?.thumbnail}
                />
              </Grid>

              <Grid item xs={5}>
                <Box>
                  <Typography
                    sx={{
                      display: "-webkit-box",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      fontSize: "0.8rem",
                      textAlign: "left",
                    }}
                  >
                    {item?.title}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Stack
                  direction={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  {item?.discount > 0 ? (
                    <>
                      <Typography
                        sx={{
                          fontWeight: "bolder",
                          fontSize: "0.7rem",
                        }}
                      >
                        {toVND(toDiscountPrice(item))}
                      </Typography>
                      <Typography
                        sx={{
                          textDecoration: "line-through",
                          fontSize: "0.7rem",
                        }}
                      >
                        {toVND(item?.price)}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography
                        sx={{
                          fontWeight: "bolder",
                          fontSize: "0.7rem",
                        }}
                      >
                        {toVND(toDiscountPrice(item))}
                      </Typography>
                    </>
                  )}
                </Stack>
              </Grid>
            </Grid>
            {index !== getSearchData?.data?.products?.length - 1 && <Divider />}
          </Box>
        </>
      );
    });
  };

  return (
    <>
      <Box
        sx={{
          maxHeight: "30rem",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {getSearchData?.data?.products?.length > 0 ? (
          <>{renderProducts()}</>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Box textAlign={"center"}>
                <Typography fontWeight={"bolder"}>
                  Không có sản phẩm nào
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default SearchDropDownComponent;
