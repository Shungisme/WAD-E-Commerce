import { Box, Grid } from "@mui/material";
import CardComponent from "../components/CardComponent";
import LayoutFilter from "../components/layouts/LayoutFilter";
import { BEST_SELLER } from "../mocks/bestSeller";
import { useState } from "react";
import PaginationComponent from "../components/PaginationComponent";


export const PERPAGE_OPITONS = [6,12,18,24];


const FilterPage = () => {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PERPAGE_OPITONS[0]);
  const data = BEST_SELLER;

  const renderCards = () => {
    return data.map((item: any, index) => {
      return (
        <>
          <Grid justifyItems={"center"} item xs={4} key={index}>
            <Box
              sx={{
                maxWidth: "20rem",
                height: "28rem",
              }}
            >
              <CardComponent item={item} />
            </Box>
          </Grid>
        </>
      );
    });
  };

  return (
    <>
      <LayoutFilter>
        {renderCards()}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width:"100%",
            mt:2
          }}
        >
          <PaginationComponent
            page={page}
            setPerpage={setPerPage}
            setPage={setPage}
            perPage={perPage}
          />
        </Box>
      </LayoutFilter>
    </>
  );
};

export default FilterPage;
