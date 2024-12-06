import { Box } from "@mui/material";
import NavigationComponent from "../components/HomeComponent/NavigationComponent";
import BodyHomeComponent from "../components/HomeComponent/BodyHomeComponent";


const HomePage = () => {
    return <>
        <Box>
            <NavigationComponent/>
            <BodyHomeComponent/>
        </Box>
    
    </>
}


export default HomePage;