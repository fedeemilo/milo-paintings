import { Container, Col } from "reactstrap";
import { useStateContext } from "../../context/ContextProvider";
import { Settings, PaintCarousel } from "../../components";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
    const { frameColor } = useStateContext();

    return (
        <>
            <Settings isHome />
            <Container>
                <Link
                    to="/"
                    className=" d-flex justify-center text-center text-uppercase font-medium leading-tight text-3xl mb-2 mt-3"
                    style={{ color: frameColor }}
                >
                    Milo Pinturas
                </Link>

                <Col className="home__carousel-container bg-light border p-4 rounded mx-auto d-flex justify-center align-middle">
                    <PaintCarousel />
                </Col>
            </Container>
        </>
    );
};

export default Home;
