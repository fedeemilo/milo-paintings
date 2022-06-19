import { useParams, useLocation, Link } from "react-router-dom";
import { Container, Card, CardImg } from "reactstrap";
import { Settings } from "../../components";
import { useStateContext } from "../../context/ContextProvider";

const Painting = () => {
    const { frameWidth, frameColor, imgPlusWidth } = useStateContext();
    const { title } = useParams();
    const location = useLocation();

    const imgSrc = location?.state?.currentSrc;
    const imgWidth = location?.state?.width;

    return (
        <div>
            <Settings isHome={false} />
            <Link
                to="/"
                className=" d-flex justify-center text-center text-uppercase font-medium leading-tight text-3xl mb-2 mt-3"
                style={{ color: frameColor }}
            >
                Milo Pinturas
            </Link>
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
