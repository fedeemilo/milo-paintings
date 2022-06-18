import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, CarouselControl, CarouselItem } from "reactstrap";
import { PAINT_CARDS } from "../../assets/dummy";
import { useStateContext } from "../../context/ContextProvider";
import "./paint-carousel.css";

const PaintCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const navigate = useNavigate();

    const { frameColor, frameWidth } = useStateContext();
    const itemsLength = PAINT_CARDS.length - 1;

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === itemsLength ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? itemsLength : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const navigateToPainting = e => {
        const { currentSrc, alt, width } = e.target;

        console.log(e);

        navigate(`/milo-painting/${alt}`, {
            state: { currentSrc, width }
        });
    };

    const carouselItemData = PAINT_CARDS.map(item => {
        return (
            <CarouselItem
                key={item.src}
                onExited={() => setAnimating(false)}
                onExiting={() => setAnimating(true)}
            >
                <img
                    className="carousel-image"
                    alt={item.altText}
                    src={item.src}
                    onClick={navigateToPainting}
                />
            </CarouselItem>
        );
    });

    return (
        <div
            className="carousel-container"
            style={{ border: `${frameWidth}px solid ${frameColor}` }}
        >
            <Carousel activeIndex={activeIndex} next={next} previous={previous}>
                {carouselItemData}
                <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={previous}
                />
                <CarouselControl
                    direction="next"
                    directionText="Next"
                    onClickHandler={next}
                />
            </Carousel>
        </div>
    );
};

export default PaintCarousel;
