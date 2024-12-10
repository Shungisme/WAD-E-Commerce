import { Box } from "@mui/material";
import MainCarousel from "./ForBody/MainCarousel";
import InformationComponent from "./ForBody/Information";
import { BEST_SELLER } from "../../mocks/bestSeller";
import SmallCarousel from "../SmallCarouselComponent";





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
            <SmallCarousel items={BEST_SELLER} type="Best seller"/>
        </Box>
    
    </>
}


export default BodyHomeComponent;