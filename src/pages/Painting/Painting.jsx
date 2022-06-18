import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container, Card, CardBody, CardImg, CardTitle } from "reactstrap";
import { Settings } from "../../components";
import { useStateContext } from "../../context/ContextProvider";

const Painting = () => {
    const { frameWidth, frameColor, imgPlusWidth } = useStateContext();
    const { title } = useParams();
    const location = useLocation();

    const imgSrc = location?.state?.currentSrc;
    const imgWidth = location?.state?.width;

    useEffect(() => {
        console.log(+imgWidth + +imgPlusWidth);
    }, [imgPlusWidth]);

    return (
        <div>
            <Settings isHome={false} />
            <Container
                className="mt-4"
                style={{
                    width: +imgWidth + +imgPlusWidth * 3.5,
                    transition: "300ms"
                }}
            >
                <Card>
                    <CardImg
                        alt={title}
                        src={imgSrc}
                        top
                        style={{
                            border: `${frameWidth}px solid ${frameColor}`
                        }}
                    />
                </Card>
            </Container>
        </div>
    );
};

export default Painting;
