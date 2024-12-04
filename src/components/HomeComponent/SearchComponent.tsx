import { Box, Typography } from "@mui/material";
import IconifyIcon from "../iconifyIcon";
import { useState } from "react";
import TextBlockComponent from "../TextBlockComponent";

const SearchComponent = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isClicked ? "row" : "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <IconifyIcon
        icon={"material-symbols-light:search"}
        fontSize={"1.5rem"}
        onClick={() => setIsClicked(!isClicked)}
      />

      {!isClicked ? (
        <Typography fontSize={"0.8rem"}>Tìm kiếm</Typography>
      ) : (
        <TextBlockComponent label={"Tìm kiếm"} />
      )}
    </Box>
  );
};

export default SearchComponent;
