import { useState } from "react";
import {
    Carousel,
    CarouselIndicators,
    CarouselControl,
    CarouselItem,
    CarouselCaption
} from "reactstrap";
import { PAINT_CARDS } from "../assets/dummy";

const PaintCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const itemsLength = PAINT_CARDS.length - 1;

    const next = () => {
        // if (animating) return;
        const nextIndex = activeIndex === itemsLength ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        // if (animating) return;
        const nextIndex = activeIndex === 0 ? itemsLength : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const carouselItemData = PAINT_CARDS.map(item => {
        return (
            <CarouselItem
                key={item.key}
                onExited={() => setAnimating(true)}
                onExiting={() => setAnimating(false)}
            >
                <img
                    alt={item.altText}
                    src={item.src}
                    style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "35rem"
                    }}
                />
                {/* <CarouselCaption captionHeader={item.altText} /> */}
            </CarouselItem>
        );
    });

    return (
        <div
            style={{
                margin: "0 auto",
                width: 800,
                height: 655,
                padding: 30,
                border: "20px solid #2E424D",
                borderRadius: "10px",
                boxShadow: "10px 11px 31px 12px rgba(91,130,145,1)"
            }}
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
