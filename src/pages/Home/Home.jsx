import { Container, Col } from "reactstrap";
import { useStateContext } from "../../context/ContextProvider";
import { Settings, PaintCarousel } from "../../components";
import "./home.css";

const Home = () => {
    const { frameColor } = useStateContext();

    return (
        <>
            <Settings isHome />
            <Container>
                <h2
                    className="text-center text-uppercase font-medium leading-tight text-3xl mb-2 mt-3"
                    style={{ color: frameColor }}
                >
                    Milo Pinturas
                </h2>
                <Col className="home__carousel-container bg-light border p-4 rounded mx-auto d-flex justify-center align-middle">
                    <PaintCarousel />
                </Col>
            </Container>
        </>
    );
};

export default Home;
