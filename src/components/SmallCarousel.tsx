import { styled } from "@mui/material";
import { forwardRef, ReactNode } from "react";
import Slider from "react-slick";

interface TProps {
  children: ReactNode;
}

const CustomSlider = styled('div')(({ theme }) => ({
  '& .slick-list': {
    margin: '0 -7px',
    '& .slick-slide > div': {
      padding: '0 10px',
    }
  },
  width: '95%', 
  margin: '0 auto'  
}));


const SmallCarouselComponent = forwardRef<Slider, TProps>((props, ref) => {
  const { children, ...rest } = props;
  const childrenCount = Array.isArray(children) ? children.length : 1;

  const settings = {
    speed: 1000,
    slidesToShow: Math.min(childrenCount, 3),
    slidesToScroll: 1,
    infinite: childrenCount > 3,
  };

  return (
    <CustomSlider className="slider-container">
      <Slider ref={ref} {...settings} {...rest}>
        {children}
      </Slider>
    </CustomSlider>
  );
});

export default SmallCarouselComponent;
