import { ReactNode } from "react";
import Slider, { Settings } from "react-slick";


interface TProps {
    children: ReactNode,
    settings: Settings
}



const CarouselComponent = ({children,settings}:TProps) => {


    return (
        <>
            <Slider {...settings}>
                {children}
            </Slider>

        </>
    )

}



export default CarouselComponent;