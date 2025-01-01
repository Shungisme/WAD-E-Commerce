import { forwardRef, ReactNode } from "react";
import Slider from "react-slick";

interface TProps {
  children: ReactNode;
}

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
    <div className="slider-container">
      <Slider ref={ref} {...settings} {...rest}>
        {children}
      </Slider>
    </div>
  );
});

export default SmallCarouselComponent;
