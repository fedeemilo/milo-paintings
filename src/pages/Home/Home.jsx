import { useState, useEffect } from "react";
import { Container, Col, Badge } from "reactstrap";
import { useStateContext } from "../../context/ContextProvider";
import { Settings, PaintCarousel } from "../../components";
import "./home.css";
import { Link } from "react-router-dom";
import { URL_API } from "../../constants/urls";

const Home = () => {
    const { frameColor } = useStateContext();

    const [paintings, setPaintings] = useState([]);

    useEffect(() => {
        fetch(URL_API)
            .then(res => res.json())
            .then(data => setPaintings(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            {/* <Settings isHome /> */}
            <Container>
                <Link
                    to="/"
                    className="milo-logo d-flex justify-center text-center text-uppercase font-medium leading-tight text-3xl mb-2 mt-3"
                    style={{ color: frameColor }}
                >
                    <Badge color="dark">M</Badge>ilo Pinturas
                </Link>

                <Col
                    md={12}
                    className="home__carousel-container p-4 rounded mx-auto d-flex justify-center align-middle"
                >
                    <PaintCarousel paintCards={paintings} />
                </Col>
            </Container>
        </>
    );
};

export default Home;
