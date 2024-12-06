import { Box } from "@mui/material";
import MainCarousel from "./ForBody/MainCarousel";
import InformationComponent from "./ForBody/Information";





const BodyHomeComponent = () => {


   

    return <>
        <Box sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection: "column",
            gap:"1rem"
        }}>
            <MainCarousel/>
            <InformationComponent/>
        </Box>
    
    </>
}


export default BodyHomeComponent;