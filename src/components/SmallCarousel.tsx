import { forwardRef, ReactNode } from "react";
import Slider from "react-slick";

interface TProps {
  children: ReactNode;
}




const SmallCarouselComponent = forwardRef<Slider,TProps>((props,ref) => {
    const {children, ...rest} = props;
  
    const settings = {
      infinite: true,
      speed: 1000,
      slidesToShow: 3,
      slidesToScroll: 1,
    };
  
    return (
      <>
        <div className="slider-container">
          <Slider ref={ref} {...settings} {...rest}>
            {children}
          </Slider>
        </div>
      </>
    );
  });
  
export default SmallCarouselComponent;
