import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, CarouselControl, CarouselItem } from "reactstrap";
import { PAINT_CARDS } from "../../assets/dummy";
import { useStateContext } from "../../context/ContextProvider";
import "./paint-carousel.css";

const PaintCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const [paintings, setPaintings] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/paintings")
            .then(res => res.json())
            .then(data => setPaintings(data))
            .catch(err => console.error(err));
    }, []);

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

    const navigateToPainting = (e, item) => {
        const { currentSrc, alt, width } = e.target;

        navigate(`/milo-painting/${alt}`, {
            state: {
                currentSrc,
                width,
                price: item.price,
                caption: item.caption
            }
        });
    };

    console.log(paintings);

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
                    onClick={e => navigateToPainting(e, item)}
                />
                <div
                    className="carousel-text"
                    style={{ marginLeft: "3rem", marginTop: "1rem" }}
                >
                    <p>{item.altText}</p>
                    <small>{item.caption}</small>
                    <p className="float-end fw-bold">U$S {item.price}</p>
                </div>
            </CarouselItem>
        );
    });

    return (
        <div
            className="carousel-container"
            style={{ border: `${frameWidth}px solid ${frameColor}` }}
        >
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
                interval={null}
            >
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
