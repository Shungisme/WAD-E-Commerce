import { Box, Grid, Grid2, Typography } from "@mui/material";
import {informationContants} from "../../../constants/informationContans";
import IconifyIcon from "../../iconifyIcon";

const InformationComponent = () => {
    const renderInformation = () => {
        return Array.isArray(informationContants()) 
        ? informationContants()?.map((item:any, index: any) => {
            return <>
                <Grid2 key={index} container columnSpacing={3}>
                    <Grid item>
                        <IconifyIcon fontSize={"3rem"} icon={item.icon}/>
                    </Grid>
                    <Grid item>
                        <Typography fontWeight={500} component={'div'}>{item.title1}</Typography>
                        <Typography fontWeight={300} component={'div'}>{item.title2}</Typography>
                    </Grid>
                </Grid2>
            </>
        }) : "Hello Information"
    }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width:"100%",
          maxWidth:"90%"
        }}
      >
        {renderInformation()}

      </Box>
    </>
  );
};

export default InformationComponent;