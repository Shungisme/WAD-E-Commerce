import { styled } from "@mui/material";
import { forwardRef, ReactNode } from "react";
import Slider, { Settings } from "react-slick";


interface TProps {
    children: ReactNode,
    settings: Settings
}



const CustomSlider = styled(Slider)(({ theme }) => ({
    "& .slick-dots": {
      bottom: "-30px", 
    },
    "& .slick-dots li button": {
      backgroundColor: "rgba(0, 0, 0, 0.5)",  
      width: "15px",  
      height: "15px",  
      borderRadius: "50%",  
    },
    "& .slick-dots li.slick-active button": {
      backgroundColor: "white", 
      width: "20px",  
      height: "20px",  
    },
    "& .slick-dots button:before":{
        content:"''"
    }
  }));

const CarouselComponent =  forwardRef<Slider, TProps>((props, ref) => {
    const { children, settings, ...rest } = props;


    return (
        <>
        <div className="slider-container">
            <CustomSlider {...settings} ref={ref} {...rest} >
                {children}
            </CustomSlider>
            </div>
        </>
    );
});



export default CarouselComponent;