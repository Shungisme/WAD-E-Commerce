import {
    Box,
    FormControl,
    MenuItem,
    Pagination,
    Select,
    SelectChangeEvent,
    Stack,
  } from "@mui/material";
  import { PERPAGE_OPITONS } from "../pages/FilterPage";
  
  interface TProps {
    page: number;
    perPage: number;
    totalPages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setPerpage: React.Dispatch<React.SetStateAction<number>>;
  }
  
  const PaginationComponent = (props: TProps) => {
    const { page, setPage, perPage, setPerpage , totalPages} = props;
  
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };
  
    const handleChangePerPage = (event: SelectChangeEvent) => {
      setPerpage(Number(event.target.value));
    };
  
    return (
      <>
        <Stack direction={"row"} alignItems={"center"} alignContent={"space-between"}>
          <Box sx={{ minWidth: 80 }}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={perPage.toString()}
                onChange={handleChangePerPage}
              >
                {PERPAGE_OPITONS.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Pagination 
            page={page} 
            count={totalPages} 
            onChange={handleChange}
            siblingCount={0}
            boundaryCount={1}
            defaultPage={1}  
            color="primary" />
        </Stack>
      </>
    );
  };
  
  export default PaginationComponent;
  