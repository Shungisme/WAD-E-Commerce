import { Box, TextField, Typography } from "@mui/material";
import IconifyIcon from "../../iconifyIcon";
import { useState } from "react";
import DropdownComponent from "../../DropdownComponent";
import SearchDropDownComponent from "./SearchDropDownComponent";

const SearchComponent = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isClicked ? "row" : "column",
        maxWidth: "100%",
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
        <DropdownComponent
          contentDrop={<SearchDropDownComponent input={input} />}
          dropdownKey="searchDropDown"
        >
          <TextField
            sx={{
              width: "11rem",
            }}
            size="small"
            variant="outlined"
            label={"Tìm kiếm"}
            onChange={(e) => setInput(e?.target?.value)}
          />
        </DropdownComponent>
      )}
    </Box>
  );
};

export default SearchComponent;
